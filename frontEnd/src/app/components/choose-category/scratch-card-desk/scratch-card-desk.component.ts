import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import * as jsPDF from 'jspdf';
import * as _moment from 'moment';
import { Content } from '@angular/compiler/src/render3/r3_ast';
const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'LL',
  },
  display: {
    dateInput: 'LL',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-scratch-card-desk',
  templateUrl: './scratch-card-desk.component.html',
  styleUrls: ['./scratch-card-desk.component.css'],
  providers: [    
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class ScratchCardDeskComponent implements OnInit {

  @ViewChild('content') content: ElementRef; 

  date = new FormControl(moment());

  constructor(private http: HttpClient) { }

  ngOnInit() {
    //--------PULL FETCH NAME OF OPERATOR FROM DB--------------------
   const operatorName = localStorage.getItem('userName');
   this.vendorCardData.operatorName = operatorName;
    //==================================================================   
  }

  isShowPhoto = false;
  isShowCost = false;
  cardQuantity = 0;
  cardCount = [""];
  cardCost = 0;
  summaryCost = 0;
  isShowConvert = false;

  vendorCardData = {
    operatorName : '',
    registrationDate: '',
    licenceNumber: '',
    name: '',
    photo: '',
    foodGroup: '',    
    serialNumber: 0,
  };
//------PULL SOME DATA FROM DB ON LICENCE NUMBER-------------------
  licenceCheck(licence){  
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };  
    this.http.post('http://localhost:3000/getVendor', {licenceNumber: licence}, httpOptions).subscribe((data: any) => {
        if(data.vendor){
          this.vendorCardData.name = data.vendor.name;
          this.vendorCardData.photo = data.vendor.photo;
          this.vendorCardData.foodGroup = data.vendor.foodGroup;
          this.isShowPhoto = true;
        }else console.log('vendor is not found');   
    });
  }
//-------------------------------------------------------------------------

//==============PUSH ALL DATA TO SERVER=====================
  submit(date, licenceNumber, cardQuantity, cost, money){    
    this.vendorCardData.registrationDate = date;
    this.vendorCardData.licenceNumber = licenceNumber;
    this.cardQuantity = cardQuantity;
    this.cardCost = cost;
    this.summaryCost = this.cardQuantity*cost + money;
    for(let i = 0; i < this.cardQuantity; i++){
      let min = 999;
      let max = 10000;
      let random = Math.floor(Math.random()*(max - min + 1));
      this.vendorCardData.serialNumber = random;
      console.log(random);
      const httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        })
      };
      this.http.post('http://localhost:3000/createVendorCard', this.vendorCardData, httpOptions).subscribe((data: any) => {
        console.log(data);
        this.isShowCost = true;
        //this.isShowConvert = true;
      });      
    }    
  }
  //=========================================================

  //================CONVERT .PDF=============================
  convert(){
    let doc = new jsPDF();
    doc.text(
    `
    =========================================================
    Vendor card:
    =========================================================
    Operator name: ${this.vendorCardData.operatorName}
    Date of registration: ${this.vendorCardData.registrationDate}
    Licence number: ${this.vendorCardData.licenceNumber}
    Name of vendor: ${this.vendorCardData.name}
    Food group: ${this.vendorCardData.foodGroup}
    ___________________  
    Card cost: ${this.cardCost}
    Quantity of cards: ${this.cardQuantity}
    ____________________
    SUMMARY: ${this.summaryCost}
    `, 10, 10);
        
    doc.save('test.pdf'); 
  }
  //=========================================================
}
