import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  modalRef: BsModalRef;
 
  constructor(private modalService: BsModalService, private http: HttpClient, private _router: Router) { 
    
  }

  ngOnInit() {    
    if(localStorage.getItem('user')){
      this.enterData.enterQuit = 'Quit';
      this.enterData.modalLogIn = false;
      this.enterData.isLogin = true;      
    }
    
  }

  isShowSubmitBtn = true;

  enterData = {      
    enterQuit: 'Log In', //Button "Log In/Quit" text
    modalLogIn: true, //In 'ngIf' templates    
    isLogin: false,
    token: '' ,
    localStatus: localStorage.getItem('user')      
  }
//*****************VALIDATION****************************************************************************************************************** */
  userInput = {
    email: new FormControl('', [Validators.required, Validators.pattern(/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/)]),
    password: new FormControl('', [Validators.required, Validators.maxLength(10), Validators.minLength(2)])
  };
  getErrorMessageEmail() {
    return this.userInput.email.hasError('required') ? 'You must enter a value' :
        this.userInput.email.hasError('pattern') ? 'Not a valid email' :
            '';
  }
  checkForm(){
    if(!this.userInput.email.invalid && !this.userInput.password.invalid){
      this.isShowSubmitBtn = false;
    } else this.isShowSubmitBtn = true;
  }
  getErrorMessagePassword() {    
    return this.userInput.password.hasError('required') ? 'You must enter a value' :
        this.userInput.password.hasError('minlength') ? 'The password is too short' :
        this.userInput.password.hasError('maxlength') ? 'The password is too long' :
            '';
  }
  
 //*********************************************************************************************************************************************** */
  
  
//Check login and logining
  logining(loginValue, passwordValue){     
    if(!Boolean(localStorage.getItem('userStatus'))){
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      };  
      let user = {
        email: loginValue,
        password: passwordValue
      };
      console.log(user.email, user.password);
      
      this.http.post('http://localhost:3000/login', user, httpOptions).subscribe((data: any) => {
      console.log(data);
      if(data.isFind){       
        this.enterData.isLogin = data.isFind; 
        this.enterData.token = data.token;
        this.enterData.enterQuit = 'Quit';
        this.enterData.modalLogIn = false;
        localStorage.setItem('userName', data.user.email);         
        localStorage.setItem('user', data.token);
        localStorage.setItem('userStatus', 'true');
        localStorage.setItem('role', data.user.role);
        this.onSetName.emit({
          name : localStorage.getItem('userName'), 
          isLogin : this.enterData.isLogin
        });
        window.location.reload();
      
      }else {
        console.log('Server not answered!(');
        console.log(data);
        alert(data.message);
      }       
    });
  } 
}
// QUIT
quit(){
  if(this.enterData.isLogin){
    console.log('confirm');    
    if(confirm('Do you really want to quit?')){
      this.enterData.enterQuit = 'Log In';
      //this.enterData.modalLogIn = true;      
      this.enterData.isLogin = false;
      localStorage.removeItem('user');
      localStorage.removeItem('userName');
      localStorage.removeItem('role');
      localStorage.setItem('userStatus', '');
      this.onSetName.emit({
        name : '', 
        isLogin : this.enterData.isLogin
    });
    this._router.navigate(['/']);
    window.location.reload();
    }
  }
}

openModal(template: TemplateRef<any>) {
  this.modalRef = this.modalService.show(template);
}
 
@Output() onSetName: EventEmitter<any> = new EventEmitter();
setName(){
  this.onSetName.emit({
    name : localStorage.getItem('userName'), 
    isLogin : this.enterData.isLogin
});
} 
  

}
