import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from '../models/dto/UserRegistrationRequest';
import {MessageResponse} from '../models/dto/MessageResponse';
import {UserDetails} from '../models/UserDetails';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl = 'http://localhost:8081/user';

  constructor(private http: HttpClient) { }

  registerUser(username: string, email: string, password: string) {

    let userRegistrationRequest = new UserRegistrationRequest(username, email, password);

    return this.http.post<MessageResponse>(this.baseUrl, userRegistrationRequest);
  }

  getUserData(email: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.baseUrl + '/' + email);
  }
}
