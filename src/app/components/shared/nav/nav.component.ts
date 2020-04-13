import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  public isLogged = false;

  constructor() { }

  ngOnInit(): void {
    this.login();
  }

  ngAfterContentChecked(): void {
    this.login();
  }

  public logout(){
    this.isLogged = false;
    return sessionStorage.removeItem('access_token');
  }

  public login(){
    if(sessionStorage.getItem('access_token') != null){
      return this.isLogged = true;
    }
  }
}
