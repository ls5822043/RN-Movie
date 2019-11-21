package com.lxq.movie.model;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.*;

/**
 * @Des: 电影表实体
 * @Author: ls
 * @Date: 2019-11-17 01:58
 **/
@Data
@Table(name = "movies")
@NameStyle(Style.normal)
public class Movies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String title;

    private String cover;

    private String createTime;

    private String rate;

    private String mDesc;

    private Integer mType;

    private String category;

    @Transient
    private Boolean isSave;
}
