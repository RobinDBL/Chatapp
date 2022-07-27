import 'package:flutter/material.dart';
import 'package:mobile/models/ChatHeader.dart';

import '../Chat.dart';

class ChatList extends StatelessWidget {
  const ChatList({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    // Generate a list
    generateList() {
      final items = List<ChatHeader>.generate(
        120,
        (i) => i % 6 == 0
            ? ChatThread(
                NetworkImage(
                    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg'),
                'Sender $i',
                "Message $i",
                "$i")
            : ChatThread(
                NetworkImage(
                    'https://flutter.github.io/assets-for-api-docs/assets/widgets/owl.jpg'),
                'Sender $i',
                "Message $i this is a long message, now the question is, does it wrap text?",
                "$i"),
      );
      return items;
    }

    final items = generateList();

    return ListView.separated(
      // Let the ListView know how many items it needs to build.
      itemCount: items.length,
      // Provide a builder function. This is where the magic happens.
      // Convert each item into a widget based on the type of item it is.
      itemBuilder: (context, index) {
        final item = items[index];

        return ListTile(
            // open the chat window
            onTap: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => const Chat()));
            },
            leading: item.BuildChatIcon(context),
            title: item.BuildChatTitle(context),
            subtitle: item.BuildChatLastMessage(context));
      },
      separatorBuilder: (context, index) {
        return Divider();
      },
    );
  }
}
