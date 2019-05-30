import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../authentication/auth.service';
 
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  loggedIn: boolean = false;
  constructor(private authService:AuthService,public auth: AuthService) {
    this.authService.authenticationState.subscribe((value: boolean) => {
      this.loggedIn = value;

    });

  }
 
  canActivate(): boolean {
    return this.auth.isAuthenticated();
  }
  public getGuardAuthentication(): boolean {
    return this.loggedIn;
  }
}