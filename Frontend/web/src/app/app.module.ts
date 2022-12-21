// Angular imports
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Public libraries
import { AuthModule, LogLevel } from 'angular-auth-oidc-client';

// Angular material imports
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthConfigModule } from './auth-config.module';
import { HomecomponentComponent } from './pages/homecomponent/homecomponent.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { ChatComponent } from './pages/chat/chat.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SocketIoConfig, SocketIoModule} from "ngx-socket-io";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import { MessageItemComponent } from './components/message-item/message-item.component';
import {MatCardModule} from "@angular/material/card";

const config: SocketIoConfig = {
  url: `${window.location.hostname}:3001`,
  options:{
  }
};

@NgModule({
  declarations: [
    AppComponent,
    HomecomponentComponent,
    AuthenticationComponent,
    ChatComponent,
    MessageItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthConfigModule, BrowserAnimationsModule,
    MatSidenavModule,
    MatDividerModule,
    SocketIoModule.forRoot(config), FormsModule, MatButtonModule, MatIconModule, MatInputModule, MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
