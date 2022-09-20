import { NgModule } from '@angular/core';
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

@NgModule({
imports: [  
    AuthModule.forRoot({
        config: {
            authority: "http://10.0.0.11:8080/realms/ChatApp/protocol/openid-connect/auth",
            authWellknownEndpointUrl: "http://10.0.0.11:8080/realms/ChatApp/.well-known/openid-configuration",
            redirectUrl: "http://10.0.0.11:4200/authentication",
            postLogoutRedirectUri: "http://10.0.0.11:4200/",
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