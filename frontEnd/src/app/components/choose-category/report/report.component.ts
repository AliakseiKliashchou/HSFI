import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
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
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ReportComponent implements OnInit {

  date = new FormControl(moment());

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
//You should see this list and compare its values with indexes
//to undestanding all matches
  taskList = [
    'Registered vendors',
    'Vendors by group',
    'Average OSS',
    'Total red flags',
    'Average quality stars',
    'Hotline calls',
    'Tot card transactions',
    'Total revenues'
  ];
  tasksToPush: {[k: string]: any} = {};

  check_checkBox(check_box, i){
    if(check_box.checked){
      this.tasksToPush[i] = this.taskList[i];      
    }else {
      delete this.tasksToPush[i];     
    }
  }

  submit(){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };  
    this.http.post('http://localhost:3000/report', this.tasksToPush, httpOptions).subscribe((data: any) => {
        console.log(data); 
    });
   
  }

}
