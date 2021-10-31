import { DepartmentDTO } from "./DepartmentDTO";
import { EmployeesDTO } from "./EmployeesDTO";
import { TaskDTO } from "./TaskDTO";

export interface AllDataDTO {
    employees: EmployeesDTO[];
    departments: DepartmentDTO[];
    tasks: TaskDTO[];
}
