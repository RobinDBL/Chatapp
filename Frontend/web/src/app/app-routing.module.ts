import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from './pages/homecomponent/homecomponent.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { AuthenticationComponent } from './authentication/authentication.component';
import {ChatComponent} from "./pages/chat/chat.component";


const routes: Routes = [
  { path: "", redirectTo: 'chat', pathMatch: 'full' },
  { path: "authentication", component: AuthenticationComponent,},
  { path: "chat", component: ChatComponent, canActivate: [AutoLoginPartialRoutesGuard],},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
