package com.example.hr.exception;

public class DuplicateEmployeeException extends BaseException {

    public DuplicateEmployeeException(String message, ErrorCode errorCode, String debugCode) {
        super(message, errorCode, debugCode);
    }
}
