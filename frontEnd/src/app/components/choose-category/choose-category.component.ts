import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-choose-category',
  templateUrl: './choose-category.component.html',
  styleUrls: ['./choose-category.component.css']
})
export class ChooseCategoryComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
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
  goToScratchCardDesk(){
    this._router.navigate(['scratchCardDesk']);
  }
  goToVendorRegistrationDesk(){
    this._router.navigate(['vendorregistrationDesk']);
  }


}
