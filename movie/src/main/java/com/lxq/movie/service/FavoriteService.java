package com.lxq.movie.service;

import com.lxq.movie.model.Favorite;
import com.lxq.movie.model.Movies;
import com.lxq.movie.model.Users;
import pers.vankid.common.utils.page.PageResponse;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:08
 **/
public interface FavoriteService {
    Boolean save(Favorite favorite);

    Boolean update(Favorite favorite);

    Boolean delete(Integer id);

    Favorite getById(Integer id);

    Boolean isSave(Integer uId,Integer mId);

    Boolean delete(Integer mId,Integer uId);

    PageResponse list(Integer uId, int num, int size);
}
