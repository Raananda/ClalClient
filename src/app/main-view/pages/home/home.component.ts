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
import { DepartmentNode } from 'src/app/core/models/DepartmentNode';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { NestedTreeControl } from '@angular/cdk/tree';

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
  dataSource = new MatTableDataSource<TaskDTO>();
  DepartmentNodes!: DepartmentNode[];
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  // Tree config
  dataSourceTree = new MatTreeNestedDataSource<DepartmentNode>();
  hasChild = (_: number, node: DepartmentNode) => !!node.children && node.children.length > 0;



  ngOnInit(): void {
    this.infraServerService.getDataFromJsonFile().subscribe(resp => {
      this.AllData = resp;
      this.Employees = this.AllData.employees;
      this.Departments = this.AllData.departments;
      this.Tasks = this.AllData.tasks;
      this.dataSource.data = this.Tasks;

      this.createDepartmentNodes(this.Departments);
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

  createDepartmentNodes(Department: DepartmentDTO[]) {

    this.DepartmentNodes = [];

    // Get all the root departments
    Department.forEach(d => {
      if (d.parentID == 0) {
        let DepartmentNode: DepartmentNode = {
          currentDepartment: d,
          children: []
        }
        this.DepartmentNodes.push(DepartmentNode);
      }
    })

    // Add the childrens to thier parents
    this.DepartmentNodes.forEach(dn => {
      dn.children = Department.filter(d => d.parentID == dn.currentDepartment.departmentID)
    })

    // Add it to the material tree data source
    this.dataSourceTree.data = this.DepartmentNodes;



  }

}


