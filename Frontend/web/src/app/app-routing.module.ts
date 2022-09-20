import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomecomponentComponent } from './pages/homecomponent/homecomponent.component';
import { AutoLoginPartialRoutesGuard } from 'angular-auth-oidc-client';
import { AuthenticationComponent } from './authentication/authentication.component';


const routes: Routes = [
  { path: "", canActivate: [AutoLoginPartialRoutesGuard], component: HomecomponentComponent},
  { path: "authentication", component: AuthenticationComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
