import { Injectable } from '@angular/core';
import {SessionStorageService} from './session-storage.service';
import {HttpClient} from '@angular/common/http';
import {MessageResponse} from '../models/dto/MessageResponse';
import {UserLoginRequest} from '../models/dto/UserLoginRequest';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  jwtHelper = new JwtHelperService();

  baseUrl = 'http://localhost:8081/authUser';

  constructor(private http: HttpClient, private sessionStorageService: SessionStorageService) { }

  logInUser(email: string, password: string) {
    let userLoginRequest = new UserLoginRequest(email, password);
    let responseObservable = this.http.post<MessageResponse>(this.baseUrl, userLoginRequest, {observe: 'response'});

    responseObservable.subscribe(
      response => {
        this.sessionStorageService.saveUserEmail(email);
        this.sessionStorageService.saveAuthToken(response.headers.get("Authorization"));
      }
    )

    return responseObservable;
  }

  public isAuthenticated(): boolean {
    const token = this.sessionStorageService.getAuthToken();
    return token == null ? false : !this.jwtHelper.isTokenExpired(token.replace('Bearer ', ''));
  }
}
