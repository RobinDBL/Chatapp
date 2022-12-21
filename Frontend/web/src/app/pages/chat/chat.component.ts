import {Component, OnInit} from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {OidcSecurityService, UserDataResult} from "angular-auth-oidc-client";
import {Router} from "@angular/router";
import {Observable} from "rxjs";
import {MessageDto} from "../../dto/Message.dto";
import {MessageType} from "../../models/messageType.enum";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: MessageDto[];
  public input: string = "";
  public userData!: Observable<UserDataResult>;
  constructor(private chatService: ChatService, private _authService: OidcSecurityService, private _router: Router) {
    this.messages = [];
  }

  ngOnInit(): void {
    this.userData = this._authService.userData$;
    this.chatService.messages.subscribe((message) => {
      this.messages.push(message);
      console.log(this.messages);
    })
    this.chatService.users.subscribe((user) => {
      let message: MessageDto = {
        userId: '',
        message: `${user} connected to the server`,
        messageType: MessageType.LOG,
        userName: user
      }
      this.messages.push(message);
      //console.log(this._authService.getUserData())

    })
    this.chatService.user.subscribe((user) => {
      let message: MessageDto = {
        userId: '',
        message: `${user} disconnected from the server`,
        messageType: MessageType.LOG,
        userName: user
      }
      this.messages.push(message);
    })

    this.chatService.connection.then((socketId: string) => {
      this.chatService.sendUser(socketId)
    })
  }

  public sendMessage() {
    this.chatService.sendMessage(this.input);
    this.input = "";
  }

}
