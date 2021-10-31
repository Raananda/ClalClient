import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AppInitResponseDTO } from 'src/app/core/models/AppInitResponseDTO';
import { InfraServerService } from 'src/app/core/services/infra-server.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  Response: any;

  constructor(private fb: FormBuilder, private infraServerService: InfraServerService) {
   }
  


  infraRequestForm = this.fb.group({
    data1: null,
    data2: [null, Validators.required],
    data3: [null, Validators.required]
  });


  ngOnInit(): void {
  }

  onSubmit(): void {
    this.infraServerService.postInit(this.infraRequestForm.value).subscribe(resp => {
      this.Response = resp;
    });
  }

  onGetInfra(){
    this.infraServerService.getInit().subscribe(resp => {
      this.Response = resp;
    });
  }

  onGetListFromJsonFile(){
    this.infraServerService.getListFromJsonFile().subscribe(resp => {
      this.Response = resp;
    });
  }

}
