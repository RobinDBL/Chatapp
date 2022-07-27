import 'package:mobile/Exceptions/AuthenticationException.dart';
import 'package:openid_client/openid_client.dart';

import 'package:http/http.dart' as http;

import '../auth/Authentication.dart';
import '../models/user.dart';

class AuthService {
  Authentication _auth = new Authentication();

  signIn() async {
    try {
      await _auth.WebLogin();
    } catch (e) {
      print(e);
    }
  }

  Future<bool> checkAuthentication() async {
    try {
      Credential c = await _auth.getAuthenticationCredential();
      c.validateToken();
      return true;
    } on AuthenticationException catch (e) {
      return false;
    }
  }

  // Future<User> getUserData() async {
  //   try{
  //     Credential c = await _auth.getAuthenticationCredential();
  //     return await c.getUserInfo();
  //   } on AuthenticationException catch (e) {
  //     return false;
  //   }
  // }

  signOut() async {
    try {
      Credential c = await _auth.getAuthenticationCredential();
      _auth.logout(c);
    } on AuthenticationException catch (e) {
      print(
          "[ERROR] the user was not authenticated before the sign out button was pressed");
    }
  }

  register() async {
    try {
      await _auth.register();
    } catch (e) {
      print(e);
    }
  }

  Future<User> getUserData() async {
    Uri url = Uri(
        scheme: "https",
        host: "authentication.blueservices.be",
        path: "api/v1/userdata/userdata",
        port: 443);

    try {
      Credential c = await _auth.getAuthenticationCredential();
      TokenResponse token = await c.getTokenResponse();

      UserInfo userinfo = await c.getUserInfo();

      User userdata = User(email: userinfo.name);
      //getApi();
      return userdata;
    } catch (e) {
      throw 'Could not get userdata';
    }
  }

  getApi() async {
    Credential c = await _auth.getAuthenticationCredential();

    var token = await c.getTokenResponse();
    var accessToken = token.accessToken;
    var url = Uri.parse('http://192.168.8.100:3000/user');
    var headers = {"Authorization": 'Bearer $accessToken'};
    var response = await http.get(url, headers: headers);
    print('Response status: ${response.statusCode}');
    print('Response body: ${response.body}');
  }
}
