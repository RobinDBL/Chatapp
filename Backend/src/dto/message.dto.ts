import { MessageType } from '../models/MessageType.enum';

export class MessageDto {
  userId: string;
  message: string;
  userName: string;
  messageType: MessageType;
}
