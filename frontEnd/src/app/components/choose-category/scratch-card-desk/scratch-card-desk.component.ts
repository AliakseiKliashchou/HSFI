import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {MomentDateAdapter} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { APIserviceService } from 'src/app/services/apiservice.service';
import {MatSnackBar} from '@angular/material/snack-bar';

import * as jsPDF from 'jspdf';
import * as _moment from 'moment';
import { Content } from '@angular/compiler/src/render3/r3_ast';
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

  constructor(private http: HttpClient, private HTTP: APIserviceService, private _snackBar: MatSnackBar) { }

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
  isShowConvert = false;
  summaryCost = 0;

  vendorCardData = {
    operatorName : '',
    registrationDate: '',
    licenceNumber: '',
    name: '',
    photo: '',
    foodGroup: '',    
    serialNumber: 0,
    cost: 0,
    money: ''
  };

  //*****************VALIDATION******************************************************* */
  isShowSubmitBtn = true;
  userInput = {    
    licenceNumber: new FormControl('', [Validators.required]),
    quantityOfCard: new FormControl('', [Validators.required]),
    cost: new FormControl('', [Validators.required, Validators.pattern('[0-9].[0-9]{2}')]),
    money: new FormControl('', [Validators.required]),
  }
  getErrorMessageLicenceNumber(){
    return this.userInput.licenceNumber.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorMessageQuantityofCard(){
    return this.userInput.quantityOfCard.hasError('required') ? 'You must enter a value' : '';
  }
  getErrorMessageCost(){
    return this.userInput.cost.hasError('required') ? 'You must enter a value' : 
      this.userInput.cost.hasError('pattern') ? 'Not a valid number' :
      '';     
  }
  getErrorMessageMoney(){
    return this.userInput.money.hasError('required') ? 'You must enter a value' : '';  
  }
  checkForm(){
    if(
      !this.userInput.licenceNumber.invalid &&
      !this.userInput.quantityOfCard.invalid &&
      !this.userInput.cost.invalid &&
      !this.userInput.money.invalid
    ){
      this.isShowSubmitBtn = false;
    }else this.isShowSubmitBtn = true;
  }

  //************************************************************************************ */



//------PULL SOME DATA FROM DB ON LICENCE NUMBER-------------------
  licenceCheck(licence){  
    this.HTTP.getVendor(licence).subscribe((data: any) => {
        if(data.vendor){
          this.vendorCardData = data.vendor;          
          this.isShowPhoto = true;
        }else this._snackBar.open('Vendor not found','', {
            duration: 2000,
        });  ;   
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
      let min = 10000;
      let max = 99999;
      let random = Math.floor(Math.random()*(max - min));
      this.vendorCardData.serialNumber = random;
      this.vendorCardData.cost = cost;
      this.vendorCardData.money = money;  
     this.HTTP.createVendorCard(this.vendorCardData).subscribe((data: any) => {       
        this.isShowCost = true;
        this.isShowConvert = true;
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
