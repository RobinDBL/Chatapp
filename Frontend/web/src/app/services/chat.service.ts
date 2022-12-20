import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
   * @empty
   *
   * @param socket The websocket object
   */
  public messages = this.socket.fromEvent<string>('receiveMessage');
  public users = this.socket.fromEvent<string>('user_connected');
  public user = this.socket.fromEvent<string>('user_disconnected');
  constructor(private socket: Socket) {}

  public sendMessage(message: string) {
    this.socket.emit('sendMessage', message);
  }

}
