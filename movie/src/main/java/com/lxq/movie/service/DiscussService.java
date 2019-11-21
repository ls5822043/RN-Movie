package com.lxq.movie.service;

import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Users;
import io.swagger.models.auth.In;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:08
 **/
public interface DiscussService {
    Boolean save(Discuss discuss);

    Boolean update(Discuss discuss);

    Boolean delete(Integer id);

    Discuss getById(Integer id);

    List<Discuss> list(Discuss discuss, int num, int size);
}
