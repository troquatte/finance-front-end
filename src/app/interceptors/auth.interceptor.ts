import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private auth_token = localStorage.getItem('access_token');

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.auth_token
    })
  };

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (this.auth_token) {
      const cloned = request.clone(this.httpOptions);
      return next.handle(cloned);
    }
    else {
        return next.handle(request);
    }
  }

  ngOnDestroy(): void {
    this.auth_token;
  }
}
