import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as _moment from 'moment';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-MM-DD',
  },
  display: {
    dateInput: 'YYYY-MM-DD',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'YYYY-MM-DD',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-hotline',
  templateUrl: './hotline.component.html',
  styleUrls: ['./hotline.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class HotlineComponent implements OnInit {

  date = new FormControl(moment());
  constructor(private http: HttpClient,  private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }

   //*****************VALIDATION******************************************************* */
   isShowSubmitBtn = true;
   userInput = {    
     idOfCaller: new FormControl('', [Validators.required]),
     serialNumber: new FormControl('', [Validators.required]),
     
   }
   getErrorMessageIdOfCaller(){
     return this.userInput.idOfCaller.hasError('required') ? 'You must enter a value' : '';
   }
   getErrorMessageSerialNumber(){
     return this.userInput.serialNumber.hasError('required') ? 'You must enter a value' : '';
   }   
   checkForm(){
     if(
       !this.userInput.idOfCaller.invalid &&
       !this.userInput.serialNumber.invalid 
     ){
       this.isShowSubmitBtn = false;
     }else this.isShowSubmitBtn = true;
   }
 
   //************************************************************************************ */



userName = '';

submit(operatorName, dateVal, callerID, serialNumber){
    //console.log(dateValue);
    //2019-05-14
    //var y = '2019-05-10';
    //var x =  moment(y);
    //console.log(moment(y).fromNow());
   let vendor = {
    operatorName: operatorName,
    callDate: dateVal,
    callerID: callerID, 
    serialNumber: serialNumber,   
    }
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/hotline', vendor, httpOptions).subscribe((data: any) => {
      console.log(data);
      this._snackBar.open('The call was done','', {
        duration: 2000,
      });
  });

    
}

}
