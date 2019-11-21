package com.lxq.movie.model;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Des: 用户表实体
 * @Author: ls
 * @Date: 2019-11-17 01:56
 **/
@Data
@Table(name = "users")
@NameStyle(Style.normal)
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String cover;

    private String userName;

    private String passWord;
}
