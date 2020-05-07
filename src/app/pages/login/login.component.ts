import { Component, OnInit } from '@angular/core';
import {ABMGenericFormField} from '../../models/generic-form-field';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup;
  loading = false;
  wrongPassword = false;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.loginForm = this.formBuilder.group({
      dni: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.max(30)]]
    });

  }

  submit(event) {
    this.loading = true;
    // TODO pegada al backend
        //error si falla
        //redirect si no
  }

}
