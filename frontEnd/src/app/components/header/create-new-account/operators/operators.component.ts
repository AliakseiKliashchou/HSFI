import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-operators',
  templateUrl: './operators.component.html',
  styleUrls: ['./operators.component.css']
})
export class OperatorsComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  toppings = new FormControl();
  toppingList: string[] = ['Vendor registration', 'Scratch card desk', 'Hotline', 'Inspection'];

  //-----------------------------VALIDATIONS---------------------------------------------
  isShowSubmitBtn = true;
  hide = true;
  userInput = {
    name: new FormControl('', [Validators.required, Validators.pattern('[A-Za-zА-Яа-яЁё]+(\s+[A-Za-zА-Яа-яЁё]+)?')]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]),   
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),   
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
      !this.userInput.password.invalid &&
      !this.userInput.country.invalid
      ){
        this.isShowSubmitBtn = false;
    }else this.isShowSubmitBtn = true;
  }
  //-------------------------------------------------------------------------------------

  submit(country, name, organization, email, password, task){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    
    console.log(country, name, organization, email, password, task);
    const user = {
      role: 'operator',
      country: country,
      name: name,
      organization: organization,
      email: email,
      password: password,
      task: task,
    };
    this.http.post('http://localhost:3000/operatorReg', user, httpOptions).subscribe((data: any) => {
      console.log(data);
      alert('New ' + data.name + ' was registered!');
    });
  }

  
  

}
