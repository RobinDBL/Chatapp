import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket } from './models/Socket.interface';
import { MessageDto } from './dto/message.dto';
import { MessageType } from './models/MessageType.enum';

@WebSocketGateway(3001, { cors: true })
export class AppGateway {
  @WebSocketServer() server;

  public sockets: Socket[] = [];

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() messageText: string, @ConnectedSocket() client) {
    const socket = this.sockets.find((socket) => {
      return socket.socket.id === client.id;
    });
    if (socket.userId === '1') {
      this.handleDisconnect(socket);
    }
    const message: MessageDto = {
      userId: socket.userId,
      message: messageText,
      userName: socket.userName,
      messageType: MessageType.MESSAGE,
    };
    this.server.emit('receiveMessage', message);
    console.log(socket.userName);
  }

  async handleConnection(@ConnectedSocket() client) {
    //let user = this._appController.getLoggedInUser();
    this.initializeConnection(client);
  }

  async handleDisconnect(@ConnectedSocket() client) {
    const socket = this.sockets.find((item) => {
      return client.id === item.socket.id;
    });
    const index: number = this.sockets.indexOf(socket);
    if (index > -1) {
      this.sockets.splice(index, 1);
    }
    this.server.emit('user_disconnected', socket.userName);
  }

  async initializeConnection(client: any) {
    const socket: Socket = {
      socket: client,
      userId: '1',
      userName: 'tmp',
    };
    this.sockets.push(socket);
    //console.log(this.sockets);
    client.emit('userConnection', client.id);
    //this.server.emit('userConnection');
  }

  async newUserConnection(userName: string) {
    this.server.emit('user_connected', userName);
  }
}
