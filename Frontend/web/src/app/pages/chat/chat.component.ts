import { Component, OnInit } from '@angular/core';
import {ChatService} from "../../services/chat.service";
import {OidcSecurityService} from "angular-auth-oidc-client";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  public messages: string[];
  public input: string = "";
  constructor(private chatService: ChatService, private _authService: OidcSecurityService, private _router: Router) {
    this.messages = [];
  }

  ngOnInit(): void {
    this.chatService.messages.subscribe((message) => {
      this.messages.push(message)
      console.log(this.messages);
    })
    this.chatService.users.subscribe((user) => {
      console.log('User connected' + user);
    })
    this.chatService.user.subscribe((name) => {
      console.log('User disconnected' + name);
    })
  }

  public sendMessage() {
    this.chatService.sendMessage(this.input);
  }

  public logout() {
    this._authService.logoffAndRevokeTokens();
    this._router.navigate(['/']);
  }

}
