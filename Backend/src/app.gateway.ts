import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { AuthenticatedUser } from 'nest-keycloak-connect';

@WebSocketGateway(3001, { cors: true })
export class AppGateway {
  @WebSocketServer() server;

  @SubscribeMessage('sendMessage')
  handleMessage(@MessageBody() message: string) {
    this.server.emit('receiveMessage', message);
    console.log(message);
  }

  async handleConnection(@AuthenticatedUser() user: any) {
    this.server.emit('user_connected', user.preferred_username);
  }

  async handleDisconnect(@AuthenticatedUser() user: any) {
    this.server.emit('user_disconnected', user.name);
  }
}
