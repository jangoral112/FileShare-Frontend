import { Injectable } from '@angular/core';
import {SessionStorageService} from './session-storage.service';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {MessageResponse} from '../models/dto/MessageResponse';
import {UserLoginRequest} from '../models/dto/UserLoginRequest';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, Subscriber} from 'rxjs';
import {UserAuthenticationResponse} from '../models/dto/UserAuthenticationResponse';

const ADMIN_ROLE = "ROLE_ADMIN"

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  baseUrl = 'http://localhost:8081/authUser';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  logInUser(email: string, password: string) {
    let userLoginRequest = new UserLoginRequest(email, password);

    let responseObservable = this.http.post<UserAuthenticationResponse>(
      this.baseUrl,
      userLoginRequest,
      { observe: 'response' }
      );

    const responseObservableWrapper = new Observable((subscriber:Subscriber<HttpResponse<UserAuthenticationResponse>>) => {
      responseObservable.subscribe(
        response => {
          this.sessionStorageService.saveUserEmail(email);
          this.sessionStorageService.setAuthorities(response.body.authorities);
          this.sessionStorageService.saveAuthToken(response.headers.get("Authorization"));
          subscriber.next(response);
        },
        error => {
          subscriber.error(error);
        }
      );
    });

    return responseObservableWrapper;
  }

  public isAuthenticated(): boolean {
    const token = this.sessionStorageService.getAuthToken();
    return token == null ? false : !this.jwtHelper.isTokenExpired(token.replace('Bearer ', ''));
  }

  public isAdmin(): boolean {
    return this.sessionStorageService.getAuthorities().includes(ADMIN_ROLE);
  }
}
