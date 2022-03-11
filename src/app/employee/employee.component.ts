import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Employee } from '../employee';
import { FormBuilder } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent {

  @Input() employee: Employee;
  directReports: Employee[] = [];
  reports: Employee[] = [];
  errorMessage: string;
  @Output() editReport: EventEmitter<any> = new EventEmitter();
  @Output() deleteReport: EventEmitter<any> = new EventEmitter();

  constructor(
    private employeeService: EmployeeService
  ) {}

  ngOnInit(){
    this.getReports(this.employee, true);
  }

  getReports(employee: Employee, direct: boolean): void{
    if (employee.directReports){
      employee.directReports.forEach( (e) => {
        this.employeeService.get(e).pipe(
          catchError(this.handleError.bind(this))
        ).subscribe(emp=> {
          this.getReports(emp, false);
          this.reports.push(emp);
          if (direct) this.directReports.push(emp);
        });
      })
    }
  }

  private handleError(e: Error | any): string {
    console.error(e);
    return this.errorMessage = e.message || 'Unable to retrieve employees';
  }

  edit(employee: Employee): void {
    this.editReport.emit(employee);
  }

  delete(report: Employee): void {
    this.employee.directReports.forEach((value: Number) => {
      if (value == report.id)
      this.employee.directReports = this.employee.directReports.filter(report => report != value)
    })
    this.deleteReport.emit({report: report, employee: this.employee});
  }
}
