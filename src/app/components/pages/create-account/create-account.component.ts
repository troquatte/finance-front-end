import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

//Service
import { AccountsService } from 'src/app/service/accounts.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  public cadastroForm: FormGroup;
  public validation: string;

  constructor(
    private accountsService: AccountsService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.cadastroForm = this.formBuilder.group({
      username: ["", Validators.required],
      email: ["", [ Validators.email,  Validators.required]],
      password: ["", Validators.required],
    });
  }

  submitForm(){
    if (this.cadastroForm.dirty && this.cadastroForm.valid){
      sessionStorage.removeItem('access_token');

      this.accountsService.createUser(this.cadastroForm.value).subscribe(
        res => {
          this.accountsService.loginUser(this.cadastroForm.value).subscribe(
            res => {
              sessionStorage.setItem('access_token', `${res}`);
              this.router.navigate(["/lancamento"]);

            }
          )
        },
        err => {
          this.validation = err
        }
      )
    }
  }
}
