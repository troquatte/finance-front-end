import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Locale
import { defineLocale } from 'ngx-bootstrap/chronos';
import { ptBrLocale } from 'ngx-bootstrap/locale';
defineLocale('pt-br', ptBrLocale);

//Imask
import {IMaskModule} from 'angular-imask';

//Controller pages
import { LancamentosComponent } from './components/pages/lancamentos/lancamentos.component';
import { AdicionarComponent } from './components/pages/adicionar/adicionar.component';

//Shared
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/shared/nav/nav.component';
import { ListGroupComponent } from './components/shared/list-group/list-group.component';
import { BalanceComponent } from './components/shared/balance/balance.component';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { NotFoundComponent } from './components/shared/not-found/not-found.component';


// Date Picker
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuccesAnimateComponent } from './components/shared/succes-animate/succes-animate.component';

//Interceptor
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoginComponent } from './components/pages/login/login.component';
import { CreateAccountComponent } from './components/pages/create-account/create-account.component';

//Services
import { AccountsService } from './service/accounts.service';
import { BalanceService } from './service/balance.service';
import { ExpenseDataService } from './service/expense-data.service';
import { ExpensesService } from './service/expenses.service';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    ListGroupComponent,
    BalanceComponent,
    PaginationComponent,
    LancamentosComponent,
    AdicionarComponent,
    NotFoundComponent,
    SuccesAnimateComponent,
    LoginComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    IMaskModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AccountsService,
    BalanceService,
    ExpenseDataService,
    ExpensesService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
