import { Component, OnInit } from '@angular/core';
import { InfraServerService } from '../core/services/infra-server.service';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.css']
})
export class MainViewComponent implements OnInit {

  constructor(private infraServerService: InfraServerService) { }

  ngOnInit() {
 
  }



  onInit(){
  
    this.infraServerService.getInit().subscribe(resp => {
      console.log(resp);
    });
  }
}
