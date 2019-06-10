import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIserviceService } from 'src/app/services/apiservice.service';

@Component({
  selector: 'app-operator-acception',
  templateUrl: './operator-acception.component.html',
  styleUrls: ['./operator-acception.component.css']
})
export class OperatorAcceptionComponent implements OnInit {

  constructor(private http: HttpClient, private HTTP: APIserviceService) { }

  ngOnInit() {  
    this.HTTP.getNewOperator(localStorage.getItem('userName')).subscribe((data: any) => {
    if(data.length > 0){
     for(let i = 0; i < data.length; i++){
      this.operatorsArray[i] = data[i];
     }
      this.isShowNullMessage = false;      
    }   
  });
  }

  isShowNullMessage = true;
  operatorsArray = [];

  accept(header, i){  
    this.HTTP.changeNewOperator(this.operatorsArray[i]._id, 'active').subscribe((data: any) => {  
    this.operatorsArray.splice(i, 1);
    header.ngOnInit();    
    if(this.operatorsArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }
  decline(header, i){  
    this.HTTP.changeNewOperator(this.operatorsArray[i]._id, 'passive').subscribe((data: any) => {  
    this.operatorsArray.splice(i, 1);
    header.ngOnInit();   
    if(this.operatorsArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }
}
