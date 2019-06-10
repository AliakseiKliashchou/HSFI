import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl, Validators} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import { APIserviceService } from 'src/app/services/apiservice.service';

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
  constructor(private http: HttpClient,  private _snackBar: MatSnackBar, private HTTP: APIserviceService) { }

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
   let vendor = {
    operatorName: operatorName,
    callDate: dateVal,
    callerID: callerID, 
    serialNumber: serialNumber,   
    }    
    this.HTTP.hotline(vendor).subscribe((data: any) => {      
      this._snackBar.open('The call was done','', {
        duration: 2000,
      });
  });    
}

}
