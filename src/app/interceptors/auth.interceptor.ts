import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {SessionStorageService} from '../services/session-storage.service';
import { Router } from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {catchError} from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private sessionStorageService: SessionStorageService, private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.sessionStorageService.getAuthToken();

    if(authToken) {

      const clonedRequest = request.clone({
        setHeaders: {
          'Authorization': authToken
        }
      });

      return next.handle(clonedRequest).pipe(
        catchError((err) => {
            if (err.status === 401) {
              this.handleUnauthorizedError();
              return of(err);
            }
            throw err;
          }
        ));

    } else {
      return next.handle(request);
    }
  }

  private handleUnauthorizedError() {
    this.toastr.error('Session has expired!', 'Error');
    this.sessionStorageService.clearSession();
    this.router.navigate(['/login']);
  }
}
