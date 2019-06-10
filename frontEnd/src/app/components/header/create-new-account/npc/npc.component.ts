import { Component, ViewChild, EventEmitter, Output, OnInit, AfterViewInit, Input } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { APIserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-npc',
  templateUrl: './npc.component.html',
  styleUrls: ['./npc.component.css']
})
export class NpcComponent implements OnInit {

  constructor( private http: HttpClient,  private _snackBar: MatSnackBar, private HTTP: APIserviceService) { }

  ngOnInit() {    
    this.HTTP.getAdminData().subscribe((data: any) => {      
        for(let i = 0; i < data[0].countries.length; i++){
          this.countriesArray[i] = data[0].countries[i];        
        }
        for(let i = 0; i < data[0].organizations.length; i++){
          this.organizationsArray[i] = data[0].organizations[i];        
        }        
    });
  }
  countriesArray = [];
  organizationsArray = [];
  isShowProgressBar = false;
//--------------VALIDATION----------------------------------------------------------------
isShowSubmitBtn = true;
hide = true;
userInput = {
  name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
  password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),
  phone: new FormControl('', [Validators.required, Validators.pattern(/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/)]),
  email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
  mailing: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
  organization: new FormControl('', [Validators.required]),
  country: new FormControl('', [Validators.required]),
}
getErrorMessageCountry(){
  return this.userInput.organization.hasError('required') ? 'You must enter a value' : '';
}

getErrorMessageName(){
  return this.userInput.name.hasError('required') ? 'You must enter a value' :
    this.userInput.name.hasError('pattern') ? 'The name field should not contains numbers' :
        '';
}
getErrorMessageOrganization(){
  return this.userInput.organization.hasError('required') ? 'You must enter a value' : '';
}
getErrorMessageMailing(){
  return this.userInput.mailing.hasError('required') ? 'You must enter a value' :
  this.userInput.mailing.hasError('pattern') ? 'Not a valid email' :
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
checkForm(){
  if(!this.userInput.email.invalid && 
    !this.userInput.name.invalid && 
    !this.userInput.organization.invalid && 
    !this.userInput.mailing.invalid &&
    !this.userInput.password.invalid &&
    !this.userInput.phone.invalid &&
    !this.userInput.country.invalid
    ){
      this.isShowSubmitBtn = false;
  }else this.isShowSubmitBtn = true;
}

//----------------------------------------------------------------------------------------

  submit(country, name, organization, mailing, phone, email, password){
    this.isShowProgressBar = true;    
    let user = {
      country: country,
      name: name,
      organization: organization,
      mailing: mailing,
      phone: phone,
      email: email,
      password: password,
      role: 'npc'
    };
    this.HTTP.npcReg(user).subscribe((data: any) => {     
      this._snackBar.open('The user was successfully registered','', {
        duration: 2000,
      });
      this.isShowProgressBar = false;
  });
  };

};
