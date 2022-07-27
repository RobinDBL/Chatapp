import 'dart:ui';

import 'package:flutter/material.dart';
import 'package:mobile/services/AuthService.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../main.dart';
import 'Account.dart';
import '_partials/ChatList.dart';

class HomePage extends StatelessWidget {
  AuthService _authService = new AuthService();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        leading: InkWell(
            onTap: () {
              Navigator.push(
                  context, MaterialPageRoute(builder: (context) => Account()));
            },
            child: Container(
                width: 10,
                height: 10,
                child: ClipRRect(
                    borderRadius: BorderRadius.circular(50.0),
                    child: CachedNetworkImage(
                        imageUrl:
                            "https://flutter.github.io/assets-for-api-docs/assets/widgets/owl-2.jpg",
                        width: 50,
                        height: 50)))),
        title: Center(child: Text("home")),
        actions: <Widget>[
          IconButton(
              onPressed: () async {
                await _authService.signOut();
                Navigator.pushReplacement(
                    context,
                    MaterialPageRoute(
                        builder: (context) => AuthenticationWrapper()));
              },
              icon: const Icon(Icons.logout))
        ],
      ),
      body: ChatList(),
    );
  }
}
