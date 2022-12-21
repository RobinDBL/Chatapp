import {Component, Input, OnInit} from '@angular/core';
import {MessageDto} from "../../dto/Message.dto";
import {Observable} from "rxjs";
import {UserDataResult} from "angular-auth-oidc-client";

@Component({
  selector: 'app-message-item',
  templateUrl: './message-item.component.html',
  styleUrls: ['./message-item.component.css']
})
export class MessageItemComponent implements OnInit {

  @Input() public messageItem!: MessageDto
  @Input() public userData!: Observable<UserDataResult>
  constructor() { }

  ngOnInit(): void {
  }

}
