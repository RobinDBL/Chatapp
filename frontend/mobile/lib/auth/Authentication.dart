// import the io version
import 'dart:convert';

import 'package:openid_client/openid_client_io.dart';
// use url launcher package
import 'package:url_launcher/url_launcher.dart';
// use secure storage
import '../Exceptions/AuthenticationException.dart';
import 'SecureStorage.dart';

class Authentication {
  Future<Credential> WebLogin() async {
    // Uri uri = new Uri(
    //     scheme: "https", host: "authentication.blueservices.be", port: 443
    //     //
    //     );

    Uri uri = new Uri(
        scheme: "http", host: "192.168.8.100", port: 80, path: "/realms/nestjs"
        //
        );

    // create the client
    var issuer = await Issuer.discover(uri);
    var client = new Client(issuer, "postman");

    // create a function to open a browser with an url
    urlLauncher(String url) async {
      if (await canLaunch(url)) {
        await launch(url, forceWebView: true, enableJavaScript: true);
        print(url);
      } else {
        throw 'Could not launch $url';
        //await launch(url, forceWebView: true, enableJavaScript: true);

        // try {
        //   await launch(url, forceWebView: true);
        // } catch (e) {
        //   throw e.toString();
        // }
      }
    }

    // create an authenticator
    var authenticator = new Authenticator(client,
        port: 4000, urlLancher: urlLauncher, scopes: ["profile"]);

    // starts the authentication
    Credential c = await authenticator.authorize();

    // close the webview when finished
    closeWebView();

    var userInfo = await c.getUserInfo();
    var token = await c.getTokenResponse();
    print(token.accessToken);

    SecureAuthStorage()
        .secureStorage
        .write(key: "credentials", value: json.encode(c).toString());

    // return the user info
    return c;
  }

  Future<Credential> getAuthenticationCredential() async {
    String? string =
        await SecureAuthStorage().secureStorage.read(key: "credentials");
    if (string != null) {
      Map<String, dynamic> d = json.decode(string);
      Credential c = Credential.fromJson(d);
      return c;
    } else {
      throw AuthenticationException();
    }
  }

  Future<Uri> logout(Credential c) async {
    Uri uri =
        Uri(scheme: "http", host: "localhost", port: 4000, path: "logout");
    Uri? url = c.generateLogoutUrl(redirectUri: uri);
    if (url != null) {
      c.revoke();
      //c.createHttpClient(Client(issuer, clientId))
      SecureAuthStorage().secureStorage.delete(key: "credentials");
      return url;
    } else {
      throw "Logout url does not work";
    }
  }

  register() async {
    String url =
        "https://authentication.blueservices.be/Identity/Account/register";

    // create a function to open a browser with an url

    if (await canLaunch(url)) {
      await launch(url, forceWebView: false, enableJavaScript: true);
      print(url);

      //TODO: Check if the user registered a new user, then close the webview and open the login page.
    } else {
      throw 'Could not launch $url';
      //await launch(url, forceWebView: true, enableJavaScript: true);
    }

    closeWebView();
  }
}
