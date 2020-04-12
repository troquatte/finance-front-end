import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LancamentosComponent } from './components/pages/lancamentos/lancamentos.component';
import { AdicionarComponent } from './components/pages/adicionar/adicionar.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateAccountComponent } from './components/pages/create-account/create-account.component';


//Guard
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'criar-conta', component: CreateAccountComponent},
  {path: 'lancamento', component: LancamentosComponent, canActivate: [AuthGuard]},
  {path: 'adicionar', component: AdicionarComponent, canActivate: [AuthGuard]},
  {path: 'editar/:id', component: AdicionarComponent, canActivate: [AuthGuard]},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    onSameUrlNavigation: 'reload'
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
