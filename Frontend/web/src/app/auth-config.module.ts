import { NgModule } from '@angular/core';
import {AuthInterceptor, AuthModule, LogLevel} from 'angular-auth-oidc-client';
import {HTTP_INTERCEPTORS} from "@angular/common/http";

@NgModule({
imports: [
    AuthModule.forRoot({
        config: {
            authority: "http://localhost:8080/realms/chatapp/.well-known/openid-configuration",
            redirectUrl: window.location.origin + '/authentication',
            postLogoutRedirectUri: window.location.origin,
            clientId: "ChatAppFrontend",
            scope: "openid profile email",
            responseType: "code",
          silentRenew: true,
          useRefreshToken: true,
          ignoreNonceAfterRefresh: true,
            secureRoutes: ['http://localhost:3000']
        }
    })
],
exports: [AuthModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
})
export class AuthConfigModule{}
