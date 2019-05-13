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
  constructor() { }

  ngOnInit() {
    this.userName = localStorage.getItem('userName');
  }
userName = '';

submit(dateValue, date){
    console.log(dateValue);
    //2019-05-14
    var y = '2019-05-10';
    //var x =  moment(y);
    console.log(moment(y).fromNow());
    
}

}
