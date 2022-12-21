import { Component, OnInit } from '@angular/core';
import {AuthenticatedResult, OidcSecurityService} from "angular-auth-oidc-client";
import {Observable} from "rxjs";

@Component({
  selector: 'app-homecomponent',
  templateUrl: './homecomponent.component.html',
  styleUrls: ['./homecomponent.component.css']
})
export class HomecomponentComponent implements OnInit {

  isAuthenticated!: Observable<AuthenticatedResult>;
  constructor(private _authService: OidcSecurityService) { }

  async ngOnInit(): Promise<void> {
    this.isAuthenticated = await this._authService.isAuthenticated$;
  }

  logout(){
    this._authService.logoffAndRevokeTokens().subscribe();
  }

  login(){
    this._authService.authorize();
  }

}
