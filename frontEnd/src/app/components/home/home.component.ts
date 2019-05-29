import { Component, OnInit,  Directive, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
formattedAddres = '';
options = {
  componentRestrictions : {
    //country: ['BY']
  }
}
  constructor(private _router: Router,  private NgZone: NgZone, private elRef: ElementRef) {
    
   }  
  

  ngOnInit() {
    
  }

  public handleAddressChange(address: any){
    this.formattedAddres = address.formatted_address;
    let str = address.formatted_address.split(',');    
    console.log(str[1]);
    
  }

  userStatus = localStorage.getItem('userStatus');

  goToVendorRegistrationDesk(){
    this._router.navigate(['vendorregistrationDesk']);
  }

  goToScratchCardDesk(){
    this._router.navigate(['scratchCardDesk']);
  }
  goToHotline(){
    this._router.navigate(['hotline']);
  }

  goToInspectionDesk(){
    this._router.navigate(['inspectionDesk']);
  }
  goToReport(){
    this._router.navigate(['report']);
  }

}
