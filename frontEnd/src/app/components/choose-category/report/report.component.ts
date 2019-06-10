import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import { APIserviceService } from 'src/app/services/apiservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import * as _moment from 'moment';
import * as jsPDF from 'jspdf';
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

  constructor(private http: HttpClient, private _snackBar: MatSnackBar, private HTTP: APIserviceService) { }

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

  task_0 = '';
  task_1 = '';
  task_2 = '';
  task_3 = '';
  task_4 = '';
  task_5 = '';
  task_6 = '';
  task_7 = '';

  isShowReportBtn = false;
  isShowProgressBar = false;  

  check_checkBox(check_box, i){
    if(check_box.checked){
      this.tasksToPush[i] = this.taskList[i];      
    }else {
      delete this.tasksToPush[i];     
    }
  }

  submit(){
    this.isShowProgressBar = true;   
    this.HTTP.report(this.tasksToPush).subscribe((data: any) => {        
        this.isShowReportBtn = true;
        if(data[0] !== ''){
          this.task_0 = `Registered vendors: ${data[0]}` + '\r\n';
        }
        if(data[1] !== ''){
          this.task_1 = `Vendors by food groups:
                         Meat     - ${data[1].meat}
                         Fastfood - ${data[1].fastfood}
                         Fruit    - ${data[1].fruit} ` + '\r\n';
        }
        if(data[2] !== ''){
          this.task_2 = `Average OSS: ${data[2]}` + '\r\n';
        }
        if(data[3] !== ''){
          this.task_3 = `Quantity of red flags: ${data[3]}` + '\r\n';
        }
        if(data[4] !== ''){
          this.task_4 = `Quantity of stars: ${data[4]}` + '\r\n';
        }
        if(data[5] !== ''){
          this.task_5 = `Hotline calls: ${data[5]}` + '\r\n';
        }
        if(data[7] !== ''){
          this.task_7 = `Total revenue:
                         USD     - ${data[7].USD}
                         BUR - ${data[7].BUR}
                         RUR    - ${data[7].RUR} ` + '\r\n';
        }
       
    });
    this._snackBar.open('Your .pdf file is ready','', {
      duration: 2000,
    }); 
    this.isShowProgressBar = false;
  } 

  report(dateVal){
    let doc = new jsPDF();
    doc.text(
      `
      ================================================
       REPORT: ${dateVal}
      ================================================
      ` + '\r\n'
      +
      `${this.task_0}`
      +
      `${this.task_1}`
      +
      `${this.task_2}`
      +
      `${this.task_3}`
      +
      `${this.task_4}`
      +
      `${this.task_5}`
      +
      `${this.task_6}`
      +
      `${this.task_7}`
      +
      `================================================
       created by HSFI service
      `
      , 10, 10);
          
      doc.save('test.pdf'); 
  }

}
