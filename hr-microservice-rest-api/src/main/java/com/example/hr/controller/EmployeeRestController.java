package com.example.hr.controller;

import com.example.hr.entity.Employee;
import com.example.hr.service.EmployeeService;
import com.example.hr.validation.TcKimlikNo;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 * @url http://localhost:8001/hr/api/v1/employees
 */
@RestController
@RequestScope
@RequestMapping("employees")
@CrossOrigin
@Validated
public class EmployeeRestController {
    private EmployeeService employeeSrv;

    public EmployeeRestController(EmployeeService employeeSrv) {
        this.employeeSrv = employeeSrv;
    }

    /**
     * @url GET http://localhost:8001/hr/api/v1/employees?page=2&size=10
     */
    @GetMapping(params = {"page", "size"})
    public List<Employee> findAllEmployees(
            @RequestParam @Min(0) int page,
            @RequestParam @Min(10) @Max(50) int size) {
        return employeeSrv.findAllEmployees(page, size);
    }

    @GetMapping("{identity}")
    public Employee findEmployeeByIdentity(@PathVariable @TcKimlikNo String identity) {
        return employeeSrv.findByIdentity(identity);
    }

    @DeleteMapping("{identity}")
    public Employee removeEmployeeByIdentity(@PathVariable @TcKimlikNo String identity) {
        return employeeSrv.removeByIdentity(identity);
    }

    @PostMapping
    public void addEmployee(@RequestBody @Validated Employee employee) {
        employeeSrv.createEmployee(employee);
    }

    @PutMapping
    public void updateEmployee(@RequestBody @Validated Employee employee) {
        employeeSrv.updateEmployee(employee);
    }
}