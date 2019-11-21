package com.lxq.movie.model;

import lombok.Data;
import tk.mybatis.mapper.annotation.NameStyle;
import tk.mybatis.mapper.code.Style;

import javax.persistence.*;
import java.util.Date;

/**
 * @Des: 评论表实体
 * @Author: ls
 * @Date: 2019-11-17 02:03
 **/
@Data
@Table(name = "discuss")
@NameStyle(Style.normal)
public class Discuss {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer Id;

    private String content;

    private Integer  uId;

    private  Integer mId;

    @Transient
    private String userCover;

    @Transient
    private String userName;

    private Date createTime;
}
