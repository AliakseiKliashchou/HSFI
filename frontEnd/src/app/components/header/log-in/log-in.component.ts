import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { APIserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  modalRef: BsModalRef;
 
  constructor(private modalService: BsModalService, private http: HttpClient, private _router: Router, private _snackBar: MatSnackBar, private HTTP: APIserviceService) { 
    
  }

  ngOnInit() {    
    if(localStorage.getItem('user')){
      this.enterData.enterQuit = 'Quit';
      this.enterData.modalLogIn = false;
      this.enterData.isLogin = true;      
    }
    
  }
  
  isShowSubmitBtn = true;
  hide = true;
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
      let user = {
        email: loginValue,
        password: passwordValue
      };      
    
      this.HTTP.login(user).subscribe((data: any) => {      
      if(data.isFind){
        this.HTTP.viewProfileUser(user).subscribe((data: any) => {
          if(data.user.activity == 'wait'){
            this._snackBar.open('Your account on moderation now','', {
              duration: 2000,
            });   
          }else{            
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
          }
        });      
      }else {               
        this._snackBar.open(`${data.message}`,'', {
          duration: 2000,
        }); 
      }       
    });
  } 
}
// QUIT
quit(){
  if(this.enterData.isLogin){       
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
