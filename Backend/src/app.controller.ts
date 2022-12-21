import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AuthenticatedUser, Unprotected } from 'nest-keycloak-connect';
import { Socket } from './models/Socket.interface';

@Controller('')
export class AppController {
  constructor(private _appGateway: AppGateway) {}

  @Get()
  public getLoggedInUser(@AuthenticatedUser() user: any) {
    return user;
  }

  @Post('user')
  public setUser(@AuthenticatedUser() user: any, @Body() socket: any) {
    if (socket.userId === user.sub) {
      const registeredSocket: Socket = this._appGateway.sockets.find((item) => {
        return item.socket.id == socket.socketId;
      });
      registeredSocket.userId = socket.userId;
      registeredSocket.userName = socket.userName;
      this._appGateway.newUserConnection(socket.userName);
    }
  }
}
