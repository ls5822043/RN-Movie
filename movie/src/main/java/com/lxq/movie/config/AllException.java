package com.lxq.movie.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import pers.vankid.common.model.base.CommonResponse;

/**
 * @Des: controller抛出异常统一处理
 * @Author: ls
 * @Date: 2019-11-10 17:28
 **/
@ControllerAdvice
public class AllException {
    @ResponseBody
    @ExceptionHandler(value = Exception.class)
    public CommonResponse errorHandler(Exception ex) {
        System.out.println(ex.toString());
        return CommonResponse.buildDefaultSuccessResponse(false);
    }
}
