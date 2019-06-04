import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-fao',
  templateUrl: './fao.component.html',
  styleUrls: ['./fao.component.css']
})
export class FaoComponent implements OnInit {

  constructor( private http: HttpClient, private _snackBar: MatSnackBar) { }

  ngOnInit() {
  }
//------------------------VALIDATION-------------------------------------------------
  hide = true;
  isShowSubmitBtn = true;
  userInput = {
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)]),
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
  }
  getErrorMessageName(){
    return this.userInput.name.hasError('required') ? 'You must enter a value' :
    this.userInput.name.hasError('pattern') ? 'The name field should not contains numbers' :
        '';
  }
  getErrorMessagePhone(){
    return this.userInput.phone.hasError('required') ? 'You must enter a value' :
    this.userInput.phone.hasError('pattern') ? 'Wrong phone number format' :
        '';
  }
  getErrorMessageEmail(){
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
        this.userInput.email.hasError('pattern') ? 'Not a valid email' :
            '';
  }
  getErrorMessagePassword(){
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
      this.userInput.password.hasError('minlength') ? 'The password is too short' :
      this.userInput.password.hasError('maxlength') ? 'The password is too long' :
        '';
  }
  checkFrom(){
    if(!this.userInput.email.invalid && !this.userInput.name.invalid && !this.userInput.phone.invalid && !this.userInput.password.invalid){
      this.isShowSubmitBtn = false;
    }else this.isShowSubmitBtn = true;
  }
  //-----------------------------------------------------------------------------------
  isShowProgressBar = false;
  submit(name, office, phone, email, password){
    this.isShowProgressBar = true;
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    }; 
    console.log(name, office, phone, email, password);
    let user = {
      role: 'fao',
      name: name,
      office: office,
      phone: phone,
      email: email,
      password: password
    };
    this.http.post('http://localhost:3000/faoReg', user, httpOptions).subscribe((data: any) => {
      console.log(data);
      this._snackBar.open('The user was successfully registered','', {
        duration: 2000,
      });
      this.isShowProgressBar = false;
    });

  }

}
