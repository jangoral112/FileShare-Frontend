import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserRegistrationRequest } from '../models/dto/UserRegistrationRequest';
import {MessageResponse} from '../models/dto/MessageResponse';
import {UserDetails} from '../models/UserDetails';
import {PatchUserRolesRequest} from '../models/dto/PatchUserRolesRequest';

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

  deleteUser(userEmail:string): Observable<string> {
    return this.http.delete(this.baseUrl + "/" + userEmail, {responseType: 'text'});
  }

  getUserData(email: string): Observable<UserDetails> {
    return this.http.get<UserDetails>(this.baseUrl + '/' + email);
  }

  getUsersDetails(): Observable<UserDetails[]> {
    return this.http.get<UserDetails[]>(this.baseUrl);
  }

  getUsersDetailsByUsernameByPhrase(phrase: string): Observable<UserDetails[]> {
    let params = new HttpParams();
    params = params.append('phrase', phrase);
    return this.http.get<UserDetails[]>(this.baseUrl, {params: params});
  }

  getUserRoles(email: string): Observable<string[]> {
    return this.http.get<string[]>(this.baseUrl + '/role/' + email);
  }

  patchUserRoles(email: string, roles: string[]) {
    let patchUserRolesRequest = new PatchUserRolesRequest(roles);
    return this.http.patch(this.baseUrl + '/role/' + email, patchUserRolesRequest, {observe: 'body'});
  }
}
