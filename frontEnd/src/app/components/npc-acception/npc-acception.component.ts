import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIserviceService } from 'src/app/services/apiservice.service';


@Component({
  selector: 'app-npc-acception',
  templateUrl: './npc-acception.component.html',
  styleUrls: ['./npc-acception.component.css']
})
export class NpcAcceptionComponent implements OnInit {

  constructor(private http: HttpClient, private HTTP: APIserviceService) { }

  ngOnInit() {    
    this.HTTP.getNewNpc().subscribe((data: any) => {
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
    this.HTTP.changeNewNpc(this.npcArray[i]._id, 'active').subscribe((data: any) => {  
    this.npcArray.splice(i, 1);
    header.ngOnInit();   
    if(this.npcArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }
  decline(header, i){  
    this.HTTP.changeNewNpc(this.npcArray[i]._id, 'passive').subscribe((data: any) => {  
    this.npcArray.splice(i, 1);
    header.ngOnInit();    
    if(this.npcArray.length == 0){
      this.isShowNullMessage = true;
    }
  });
  }

}
