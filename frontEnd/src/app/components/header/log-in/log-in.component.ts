import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient, HttpHeaders } from '@angular/common/http';





@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService, private http: HttpClient) { }

  ngOnInit() {
  }

  enterData = {
    name: 'admin',
    logInOut: false,
    enterQuit: 'Log In',
    modalLogIn: true,
    enterState: false,
    isLogin: false
  }

//Check login and logining
  logining(loginValue, passwordValue){
    
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };  
    
    let user = {
      login: loginValue,
      password: passwordValue
    };
    
    this.http.post('http://localhost:3000/login', user, httpOptions).subscribe((data: any) => {
      console.log(data); 
      this.enterData.isLogin = data.isLogin; 
      if(this.enterData.isLogin){
        this.enterData.logInOut = true;
        this.enterData.modalLogIn = false;
        this.enterData.enterState = true;
        this.enterData.enterQuit = 'Quit';
        this.onSetName.emit(this.enterData); 
      } else alert('Wrong password or e-mail');        
    });  
      
        
         
  }
//--------------------------------------

checkIsLogin(){
  if(this.enterData.enterState){
    let qa = function() { return confirm('Do you really want to quit?'); }     
    if(qa()){
     this.enterData.logInOut = false;
     this.enterData.modalLogIn = true;
     this.enterData.enterQuit = 'Log In';
     this.enterData.enterState = false;
     this.onSetName.emit(''); 
    }
   }
}
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  @Output() onSetName: EventEmitter<any> = new EventEmitter(); 
  
  

}
