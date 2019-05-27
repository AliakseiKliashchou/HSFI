/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MapsAPILoader} from '@agm/core';

import {Title} from '@angular/platform-browser';
import {Location, Appearance} from '@angular-material-extensions/google-maps-autocomplete';
import {} from 'googlemaps';
import PlaceResult = google.maps.places.PlaceResult;
import { FormControl } from '@angular/forms';
import { from } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  title = 'app';
  @ViewChild('search')
  public searchElementRef: ElementRef;
  public zoom: number;
  public latitude: number;
  public longitude: number;
  public latlongs: any = [];
  public latlong: any = {};
  public searchControl: FormControl;

  constructor(private _router: Router, private mapsAPILoader: MapsAPILoader, private NgZone: NgZone,) { }

  ngOnInit() {
    this.zoom = 8;
    this.latitude = 39.8282;
    this.longitude = -98.5795;
    this.searchControl = new FormControl();
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: [],
        componentRestrictions: {'country' : 'IN'}
      });
      autocomplete.addListener('place_change', () => {
        this.NgZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if(place.geometry === undefined || place.geometry === null){
             return;              
          }
          const latlong = {
            latitude: place.geometry.location.lat,
            longitude: place.geometry.location.lng,
          };
          this.latlongs.push(latlong);
          this.searchControl.reset();
        });
      });
    });
  }

  private setCurrentPosition(){
    if('geolocation' in navigator){
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 8;
      });
    }
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
