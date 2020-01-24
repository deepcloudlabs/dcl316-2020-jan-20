package com.example.hr.entity;

import com.example.hr.validation.Iban;
import com.example.hr.validation.TcKimlikNo;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import javax.validation.constraints.Min;
import javax.validation.constraints.Size;
import java.util.Objects;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@Document(collection = "employees")
public class Employee {
    @Id
    @TcKimlikNo
    private String identity;
    @Size(min = 3)
    private String fullname;
    @Min(3000)
    private double salary;
    @Iban
    private String iban;
    private String photo;
    private int birthYear;
    private boolean fulltime;

    private Department department;

    public Employee() {
    }

    //region setters/getters
    public String getIdentity() {
        return identity;
    }

    public void setIdentity(String identity) {
        this.identity = identity;
    }

    public String getFullname() {
        return fullname;
    }

    public void setFullname(String fullname) {
        this.fullname = fullname;
    }

    public double getSalary() {
        return salary;
    }

    public void setSalary(double salary) {
        this.salary = salary;
    }

    public int getBirthYear() {
        return birthYear;
    }

    public void setBirthYear(int birthYear) {
        this.birthYear = birthYear;
    }

    public String getIban() {
        return iban;
    }

    public void setIban(String iban) {
        this.iban = iban;
    }

    public String getPhoto() {
        return photo;
    }

    public void setPhoto(String photo) {
        this.photo = photo;
    }

    public boolean isFulltime() {
        return fulltime;
    }

    public void setFulltime(boolean fulltime) {
        this.fulltime = fulltime;
    }

    public Department getDepartment() {
        return department;
    }

    public void setDepartment(Department department) {
        this.department = department;
    }
    //endregion

    //region equals/hashCode
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Employee employee = (Employee) o;
        return Objects.equals(identity, employee.identity);
    }

    @Override
    public int hashCode() {
        return Objects.hash(identity);
    }

    //endregion

    //region toString
    @Override
    public String toString() {
        return "Employee{" +
                "identity='" + identity + '\'' +
                ", fullname='" + fullname + '\'' +
                ", salary=" + salary +
                ", iban='" + iban + '\'' +
                ", fulltime=" + fulltime +
                ", department=" + department +
                '}';
    }
    //endregion
}
