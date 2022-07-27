import 'package:flutter/material.dart';
import 'package:mobile/services/AuthService.dart';

import '../models/user.dart';

class Account extends StatelessWidget {
  AuthService _authService = new AuthService();

  Future<User> getUserData() async {
    User user = await _authService.getUserData();
    return user;
  }

  @override
  Widget build(BuildContext context) {
    AuthService _authService = new AuthService();
    return FutureBuilder<User>(
      future: getUserData(),
      builder: (context, snapshot) {
        if (!snapshot.hasData) {
          return Container(child: Center(child: CircularProgressIndicator()));
        } else {
          User user = snapshot.data!;
          return Scaffold(
            appBar: AppBar(
              title: Center(child: Text(user.email!)),
            ),
            body: Container(
              child: Text("Test"),
            ),
          );
        }
      },
    );
  }
}
