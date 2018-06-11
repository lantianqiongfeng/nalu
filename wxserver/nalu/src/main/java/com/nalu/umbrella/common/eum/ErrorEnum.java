package com.nalu.umbrella.common.eum;

/**
 * Created by acer on 2017/6/23.
 */
public enum ErrorEnum {

    SYSTEM_SUCCESS("S0001",""),
    SYSTEM_FAILURE("F9999","系统异常"),
    ;

    private String errorCode;

    private String errorMessage;

    public String getErrorCode() {
        return errorCode;
    }

    public void setErrorCode(String errorCode) {
        this.errorCode = errorCode;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    ErrorEnum(String errorCode, String errorMessage) {
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }
}
