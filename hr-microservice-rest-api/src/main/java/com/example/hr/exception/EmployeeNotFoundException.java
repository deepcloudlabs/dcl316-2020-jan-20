package com.example.hr.exception;

public class EmployeeNotFoundException extends BaseException {
    public EmployeeNotFoundException(String message, ErrorCode errorCode, String debugCode) {
        super(message, errorCode, debugCode);
    }
}
