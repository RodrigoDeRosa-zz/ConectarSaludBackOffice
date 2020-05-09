import { Component, OnInit } from '@angular/core';
import {ABMGenericFormField} from '../../models/generic-form-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {SessionService} from '../../services/session.service';
import {AuthenticatedUser} from '../../models/authenticated-user';
import {HttpErrorResponse} from '@angular/common/http';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  dni: FormControl =  new FormControl('', [Validators.required, Validators.pattern(/^-?(0|[1-9]\d*)?$/)]);
  password: FormControl =  new FormControl('', [Validators.required, Validators.max(30)]);
  loading = false;
  wrongPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private sessionService: SessionService,
    private router: Router) {

  }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      dni: this.dni,
      password: this.password
    });

  }

  submit(event) {
    this.loading = true;
    this.loginService.authenticate(this.loginForm.get('dni').value, this.loginForm.get('password').value).subscribe(
(response:AuthenticatedUser) => {
        this.sessionService.createUserOnSession(response);
        this.loading = false;
        this.router.navigate(['/']);
      },
(error:HttpErrorResponse) => {
        this.loading = false;
        this.wrongPassword = true;
      }
    );
  }

}
