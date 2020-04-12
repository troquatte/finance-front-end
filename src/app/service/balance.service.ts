import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

//Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interface
import { Balance } from '../models/balance';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {

  //Url MS
  private msUrl = `${environment.msUrl}/balance`;

  constructor(
    private http: HttpClient
  ){}

  //Get Tags in Repo
  public getBalance(tag:string = "", page:number = 0, prev_date: string = "", curr_date: string = "" ): Observable<Balance>{
    return this.http.post<Balance>(`${this.msUrl}/read/`,{ tag:tag, page: page, prev_date: prev_date, curr_date:curr_date}).pipe(
      map( res=> res["response"])
    );
  }

}
