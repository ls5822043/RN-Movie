package com.lxq.movie.service;

import com.lxq.movie.model.Movies;
import com.lxq.movie.model.Users;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:08
 **/
public interface UsersService {
    Users save(Users users);

    Boolean update(Users users);

    Boolean delete(Integer id);

    Users loginUser(Users users);

    Users getById(Integer id);

    Boolean getByName(String userName);

    List<Users> list(Users users, int num, int size);
}
