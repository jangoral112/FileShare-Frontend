import { Injectable } from '@angular/core';
import {withIdentifier} from 'codelyzer/util/astQuery';

const EMAIL = "email";
const AUTH_TOKEN = "authToken";
const AUTHORITIES = 'authorities'

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  clearSession() {
    window.sessionStorage.clear();
  }

  public saveUserEmail(email: string) {
    window.sessionStorage.removeItem(EMAIL);
    window.sessionStorage.setItem(EMAIL, email);
  }

  public getEmail(): string {
    return window.sessionStorage.getItem(EMAIL);
  }

  public saveAuthToken(authToken: string) {
    window.sessionStorage.removeItem(AUTH_TOKEN);
    window.sessionStorage.setItem(AUTH_TOKEN, authToken);
  }

  public getAuthToken(): string {
    return window.sessionStorage.getItem(AUTH_TOKEN);
  }

  public setAuthorities(authorities: string[]) {
    window.sessionStorage.removeItem(AUTHORITIES)
    window.sessionStorage.setItem(AUTHORITIES, authorities.join(" "))
    console.log(authorities);
  }

  public getAuthorities(): string[] {
    return window.sessionStorage.getItem(AUTHORITIES).split(" ");
  }
}
