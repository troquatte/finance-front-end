import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public validation: string;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  // d.troquatte201@yahoo.com.br
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ["", [ Validators.email,  Validators.required]],
      password: ["", Validators.required],
    });
  }

  submitForm(){
    if (this.loginForm.dirty && this.loginForm.valid){
      localStorage.removeItem('access_token');

      this.accountsService.loginUser(this.loginForm.value).subscribe(
        res => {
            localStorage.setItem('access_token', `${res}`);
            window.location.href = "/lancamento"
        },
        err => {
          this.validation = "Usuário ou Senha já cadastrado"
        }
      )

    }

  }
}
