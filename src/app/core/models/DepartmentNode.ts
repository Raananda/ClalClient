import { DepartmentDTO } from "./DepartmentDTO";

export interface DepartmentNode {
    currentDepartment: DepartmentDTO;
    children?: DepartmentDTO[];
}