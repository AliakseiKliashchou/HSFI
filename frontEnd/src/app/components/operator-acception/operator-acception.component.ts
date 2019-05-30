import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-operator-acception',
  templateUrl: './operator-acception.component.html',
  styleUrls: ['./operator-acception.component.css']
})
export class OperatorAcceptionComponent implements OnInit {

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.get('http://localhost:3000/getNewOperator', httpOptions).subscribe((data: any) => {
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
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeNewOperator', {_id: this.operatorsArray[i]._id, activity: 'active'}, httpOptions).subscribe((data: any) => {  
    this.operatorsArray.splice(i, 1);
    header.ngOnInit();
    console.log(this.operatorsArray);
    if(this.operatorsArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }
  decline(header, i){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeNewOperator', {_id: this.operatorsArray[i]._id, activity: 'passive'}, httpOptions).subscribe((data: any) => {  
    this.operatorsArray.splice(i, 1);
    header.ngOnInit();
    console.log(this.operatorsArray);
    if(this.operatorsArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }

}
