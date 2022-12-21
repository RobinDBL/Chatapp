import {MessageType} from "../models/messageType.enum";

export interface MessageDto{
  message: string;
  userId: string;
  userName: string;
  messageType: MessageType;
}
