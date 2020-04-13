import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//Rxjs
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

//Interface
import { Accounts } from '../models/accounts';

//Jwt
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  //Url MS
  private msUrl = `${environment.msUrl}/accounts`;

  //Jwt
  private jwtHelper = new JwtHelperService();

  constructor(
    private http: HttpClient
  ){}

  //Create Account
  public createUser(payload): Observable<Accounts>{
    const { username, email, password } = payload;

    return this.http.post<Accounts>(`${this.msUrl}/create`, { username, email, password }).pipe(
      map(
        res => res['response']
      ),
      catchError(this.handleErrorCreateUser)
    )
  }

  public loginUser(payload): Observable<Accounts>{
    const { email, password } = payload;

    return this.http.post<Accounts>(`${this.msUrl}/sessions`, { email, password }).pipe(
      map(
        res => res['token']
      )
    )
  }

  public isAuthenticated(): boolean{
    //Verifica o Token no localStorage
    const token = sessionStorage.getItem('access_token');
    //Pergunta se o token já expirou
    return !this.jwtHelper.isTokenExpired(token);
  }

  handleErrorCreateUser(error: HttpErrorResponse){
    return throwError(error["error"]["response"]);
  }

}
