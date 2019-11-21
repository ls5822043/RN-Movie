package com.lxq.movie.model;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

/**
 * @Des: 收藏表实体
 * @Author: ls
 * @Date: 2019-11-17 02:01
 **/
@Data
@Table(name = "favorite")
@NameStyle(Style.normal)
public class Favorite {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private Integer mId;

    private Integer uId;
}
