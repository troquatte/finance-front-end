import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';

//Rxjs
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

//Interfaces
import { Adicionar } from '../models/adicionar';
import { Tags } from '../models/Tags';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  //Url MS
  private msUrl = `${environment.msUrl}/expense`;

  constructor(
    private http: HttpClient
  ){}

  //Get Tags in Repo
  public getTags(): Observable<Tags>{
    return this.http.get<Tags>(`${this.msUrl}/tag`).pipe(
      map( res=> res["response"])
    );
  }

  //Add Expenses
  public addExpenses(payload: Adicionar): Observable<Adicionar>{
    return this.http.post<Adicionar>(`${this.msUrl}/create`, payload);
  }

  //read Expenses
  public readExpenses(id){
    return this.http.get(`${this.msUrl}/read/${id}`).pipe(
      map( res => res['response'])
    );
  }

  //Update Expenses
  public updateExpenses(id, payload){
    return this.http.put(`${this.msUrl}/update/${id}`, {payload}).pipe(
      map( res => res['response'])
    );
  }

  //Delete
  public deleteExpenses(id){
    return this.http.delete(`${this.msUrl}/delete/${id}`, {});
  }
}
