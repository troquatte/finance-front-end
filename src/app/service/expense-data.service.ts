import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

//Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import { Adicionar } from '../models/adicionar';

@Injectable({
  providedIn: 'root'
})
export class ExpenseDataService {
  //Url MS
  private msUrl = `${environment.msUrl}/data-exp`;

  constructor(
    private http: HttpClient
  ) { }

  public getAllExpenses(tag:string = "", page:number = 0, prev_date: string = "", curr_date: string = "" ): Observable<Adicionar[]>{
    return this.http.get<Adicionar[]>(`${this.msUrl}/data-list-paginator/?tag=${tag}&page=${page}&prev_date=${prev_date}&curr_date=${curr_date}`).pipe(
      map( res=> res["response"])
    );
  }
}
