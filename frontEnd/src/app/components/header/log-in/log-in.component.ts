import { Component, OnInit, TemplateRef, Output, EventEmitter } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { HttpClient } from '@angular/common/http';





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

  server(){
    this.http.get('http://localhost:3000')
    console.log('server');
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
 
  @Output() onSetName: EventEmitter<any> = new EventEmitter(); 
  
  enterData = {
    name: 'admin',
    logInOut: false,
    enterQuit: 'Log In',
    modalLogIn: true,
    enterState: false
  }

  setName(login, password){
    if(!this.enterData.enterState){
      if(login=='admin' && password==491956){
        this.enterData.logInOut = true;
        this.enterData.modalLogIn = false;
        this.enterData.enterState = true;
        this.enterData.enterQuit = 'Quit';
        this.onSetName.emit(this.enterData);       
      } else alert('Wrong password or e-mail');
    }     
  }

  checkEnterState(){
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

}
