import { Injectable } from '@angular/core';
import {Socket} from "ngx-socket-io";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import {SocketDto} from "../dto/Socket.dto";
import {MessageDto} from "../dto/Message.dto";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  /**
   * @empty
   *
   * @param socket The websocket object
   */
  public messages = this.socket.fromEvent<MessageDto>('receiveMessage');
  public users = this.socket.fromEvent<any>('user_connected');
  public user = this.socket.fromEvent<string>('user_disconnected');
  public connection = this.socket.fromOneTimeEvent<string>('userConnection');
  constructor(private socket: Socket, private _http: HttpClient, private _authService: OidcSecurityService) {}

  public sendMessage(message: string) {
    this.socket.emit('sendMessage', message);
  }

  public async sendUser(socketId: string) {
    let userData: any = await this._authService.getUserData();
    let socket: SocketDto = {
      userId: userData.sub,
      socketId: socketId,
      userName: userData.preferred_username
    }
    console.log(socket);
    this._http.post('http://localhost:3000/user', socket).subscribe();

  }




}
