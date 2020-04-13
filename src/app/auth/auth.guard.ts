import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AccountsService } from '../service/accounts.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public auth: AccountsService, public router: Router) {}

  canActivate():boolean {
    if(!this.auth.isAuthenticated()){
      this.router.navigate(['']);
      return false
    }

    return true
  }

}
