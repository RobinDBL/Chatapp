import 'package:flutter/material.dart';

class Chat extends StatelessWidget {
  const Chat({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Center(child: Text("enter username here")),
      ),
      body: Container(
        child: Text("Test"),
      ),
    );
  }
}
