import { Component, OnInit, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { FormBuilder, Validators } from '@angular/forms';
import { InfraServerService } from 'src/app/core/services/infra-server.service';
import { AllDataDTO } from 'src/app/core/models/AllDataDTO';
import { EmployeesDTO } from 'src/app/core/models/EmployeesDTO';
import { DepartmentDTO } from 'src/app/core/models/DepartmentDTO';
import { TaskDTO } from 'src/app/core/models/TaskDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver, private fb: FormBuilder, private infraServerService: InfraServerService) { }

  AllData!: AllDataDTO;
  Employees!: EmployeesDTO[];
  Departments!: DepartmentDTO[];
  Tasks!: TaskDTO[];
  selectedEmployee!: EmployeesDTO;

  //Table config
  displayedColumns: string[] = ['TaskNumber', 'TaskName', 'StatusID', 'EmployeeName', 'DepartmentID', 'DueDate'];
  //dataSource!: TaskDTO[];
  dataSource = new MatTableDataSource<TaskDTO>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.infraServerService.getDataFromJsonFile().subscribe(resp => {
      this.AllData = resp;
      this.Employees = this.AllData.employees;
      this.Departments = this.AllData.departments;
      this.Tasks = this.AllData.tasks;
      this.dataSource.data = this.Tasks;
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onSelectedAll() {
    this.dataSource.data = this.Tasks;
  }

  onSelectedEmployee(selectedEmployee: EmployeesDTO) {
    this.selectedEmployee = selectedEmployee;
    this.dataSource.data = this.Tasks.filter(task => task.employeeName == selectedEmployee.employeeName)
  }

}


