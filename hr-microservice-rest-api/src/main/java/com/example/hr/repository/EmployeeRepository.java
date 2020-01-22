package com.example.hr.repository;

import com.example.hr.entity.Department;
import com.example.hr.entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Collection;

public interface EmployeeRepository extends
        JpaRepository<Employee, String> {
   Collection<Employee> findTop10ByOrderByBirthYear();

   Employee findTopByOrderByBirthYearDesc();

   Collection<Employee> findAllByDepartment(Department department);
   //@Query(value = "select e from Employee e where e.department=:department")
   //@Query(value = "select * from employees where department=:department",nativeQuery = true)
   //Collection<Employee> araDepartmentGore(Department department);

}
