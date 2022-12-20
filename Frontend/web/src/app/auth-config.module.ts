import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
imports: [
    AuthModule.forRoot({
        config: {
            authority: "http://localhost:8080/realms/chatapp/protocol/openid-connect/auth",
            authWellknownEndpointUrl: "http://localhost:8080/realms/chatapp/.well-known/openid-configuration",
            redirectUrl: "http://localhost:4200/authentication",
            postLogoutRedirectUri: "http://localhost:4200/",
            clientId: "ChatAppFrontend",
            scope: "openid profile email",
            logLevel: LogLevel.Debug,
            responseType: "code",
            triggerAuthorizationResultEvent: true,
            postLoginRoute: "/authentication"
        }
    })
],
exports: [AuthModule],
})
export class AuthConfigModule{}
