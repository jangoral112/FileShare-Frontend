import { Injectable } from '@angular/core';
import {SessionStorageService} from './session-storage.service';
import {HttpClient} from '@angular/common/http';
import {MessageResponse} from '../models/dto/MessageResponse';
import {UserLoginRequest} from '../models/dto/UserLoginRequest';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
}
