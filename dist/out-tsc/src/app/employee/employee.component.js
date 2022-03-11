"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var employee_1 = require("../employee");
var employee_service_1 = require("../employee.service");
var operators_1 = require("rxjs/operators");
var EmployeeComponent = /** @class */ (function () {
    function EmployeeComponent(employeeService) {
        this.employeeService = employeeService;
        this.directReports = [];
        this.reports = [];
    }
    EmployeeComponent.prototype.ngOnInit = function () {
        this.getReports(this.employee, true);
    };
    EmployeeComponent.prototype.getReports = function (employee, direct) {
        var _this = this;
        if (employee.directReports) {
            employee.directReports.forEach(function (e) {
                _this.employeeService.get(e).pipe(operators_1.catchError(_this.handleError.bind(_this))).subscribe(function (emp) {
                    _this.getReports(emp, false);
                    _this.reports.push(emp);
                    if (direct)
                        _this.directReports.push(emp);
                });
            });
        }
    };
    EmployeeComponent.prototype.handleError = function (e) {
        console.error(e);
        return this.errorMessage = e.message || 'Unable to retrieve employees';
    };
    __decorate([
        core_1.Input(),
        __metadata("design:type", employee_1.Employee)
    ], EmployeeComponent.prototype, "employee", void 0);
    EmployeeComponent = __decorate([
        core_1.Component({
            selector: 'app-employee',
            templateUrl: './employee.component.html',
            styleUrls: ['./employee.component.css']
        }),
        __metadata("design:paramtypes", [employee_service_1.EmployeeService])
    ], EmployeeComponent);
    return EmployeeComponent;
}());
exports.EmployeeComponent = EmployeeComponent;
//# sourceMappingURL=employee.component.js.map