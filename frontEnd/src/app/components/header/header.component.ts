import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  name: string;
  logInOut: boolean;
  constructor() { }

  ngOnInit() {
  }
  
  setName(event){
    this.name = event.name;
    this.logInOut = event.logInOut;
  }

}
