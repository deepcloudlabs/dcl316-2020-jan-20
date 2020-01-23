package com.example.hr.dto;

public class RestErrorMessage {
    private final String message;
    private final String errorCode;
    private final String debugCode;

    public RestErrorMessage(String message,
                            String errorCode,
                            String debugCode) {
        this.message = message;
        this.errorCode = errorCode;
        this.debugCode = debugCode;
    }

    public String getMessage() {
        return message;
    }

    public String getErrorCode() {
        return errorCode;
    }

    public String getDebugCode() {
        return debugCode;
    }
}
