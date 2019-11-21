package com.lxq.movie.service;

import com.lxq.movie.model.Movies;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:08
 **/
public interface MoviesService {
    Boolean save(Movies movies);

    Boolean update(Movies movies);

    Boolean delete(Integer id);

    Movies getById(Integer id,Integer uId);

    List<Movies> list(Movies movies,Integer uId, int num , int size);
}
