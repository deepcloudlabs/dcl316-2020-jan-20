package com.example.hr.repository;

import com.example.hr.entity.Department;
import com.example.hr.entity.Employee;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Collection;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
public interface EmployeeRepository extends MongoRepository<Employee, String> {
   Collection<Employee> findTop10ByOrderByBirthYear();

   Employee findTopByOrderByBirthYearDesc();

   Collection<Employee> findAllByDepartment(Department department);

   @Query(value = "select e from Employee e where e.department=:department")
   Collection<Employee> searchEmployeesByDepartmentJPQL(Department department);

}
