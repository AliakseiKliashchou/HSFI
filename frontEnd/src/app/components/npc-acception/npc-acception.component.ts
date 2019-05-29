import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-npc-acception',
  templateUrl: './npc-acception.component.html',
  styleUrls: ['./npc-acception.component.css']
})
export class NpcAcceptionComponent implements OnInit {

  constructor(private http: HttpClient,) { }

  ngOnInit() {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.get('http://localhost:3000/getNewNpc', httpOptions).subscribe((data: any) => {
    if(data.length > 0){
     for(let i = 0; i < data.length; i++){
      this.npcArray[i] = data[i];
     }
      this.isShowNullMessage = false;
      
    }
   
  });
  }
  isShowNullMessage = true;
  npcArray = [];

  accept(header, i){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeNewNpc', {_id: this.npcArray[i]._id, activity: 'active'}, httpOptions).subscribe((data: any) => {  
    this.npcArray.splice(i, 1);
    header.ngOnInit();
    console.log(this.npcArray);
    if(this.npcArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }
  decline(header, i){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*"
      })
    };
    this.http.post('http://localhost:3000/changeNewNpc', {_id: this.npcArray[i]._id, activity: 'passive'}, httpOptions).subscribe((data: any) => {  
    this.npcArray.splice(i, 1);
    header.ngOnInit();
    console.log(this.npcArray);
    if(this.npcArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }

}
