import 'package:flutter/cupertino.dart';

abstract class ChatHeader {
  // The icon on of the chat thread
  Widget BuildChatIcon(BuildContext context);

  // The title of the chat
  // Is either a username or a group name
  Widget BuildChatTitle(BuildContext context);

  // The last message that was sent or received
  Widget BuildChatLastMessage(BuildContext context);
}

class ChatThread implements ChatHeader {
  final String chatTitle;
  final NetworkImage chatIcon;
  final String chatLastMessage;
  final String id;

  ChatThread(this.chatIcon, this.chatTitle, this.chatLastMessage, this.id);

  @override
  Widget BuildChatIcon(BuildContext context) => Image(image: chatIcon);

  @override
  Widget BuildChatTitle(BuildContext context) => Text(chatTitle);

  @override
  Widget BuildChatLastMessage(BuildContext context) => Text(chatLastMessage);
}
