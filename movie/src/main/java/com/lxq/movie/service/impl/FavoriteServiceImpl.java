package com.lxq.movie.service.impl;

import com.lxq.movie.mapper.FavoriteMapper;
import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Favorite;
import com.lxq.movie.model.Movies;
import com.lxq.movie.service.FavoriteService;
import com.lxq.movie.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pers.vankid.common.utils.page.PageResponse;
import pers.vankid.common.utils.page.PageUtil;
import tk.mybatis.mapper.entity.Example;

import java.util.ArrayList;
import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:13
 **/
@Service
public class FavoriteServiceImpl implements FavoriteService {

    @Autowired
    private FavoriteMapper favoriteMapper;

    @Override
    public Boolean save(Favorite favorite) {
        return favoriteMapper.insertSelective(favorite)>0;
    }

    @Override
    public Boolean update(Favorite favorite) {
        return favoriteMapper.updateByPrimaryKeySelective(favorite)>0;
    }

    @Override
    public Boolean delete(Integer id) {
        return favoriteMapper.deleteByPrimaryKey(id)>0;
    }

    @Override
    public Favorite getById(Integer id) {
        return favoriteMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean isSave(Integer uId, Integer mId) {
        Example example=new Example(Favorite.class);
        example.createCriteria().andEqualTo("uId",uId).andEqualTo("mId",mId);
        int i = favoriteMapper.selectCountByExample(example);
        return i>0;
    }

    @Override
    public Boolean delete(Integer mId, Integer uId) {
        Example example=new Example(Favorite.class);
        example.createCriteria().andEqualTo("uId",uId).andEqualTo("mId",mId);
        return favoriteMapper.deleteByExample(example)>0;
    }

    @Autowired
    private MoviesService moviesService;

    @Override
    public PageResponse list(Integer uId, int num, int size) {
        PageUtil.start(num, size);
        Example example=new Example(Favorite.class);
        example.createCriteria().andEqualTo("uId",uId);
        List<Favorite> favorites = favoriteMapper.selectByExample(example);
        PageResponse pageResponse=PageUtil.getPageResponse(favorites);
        List<Movies> movies=new ArrayList<>();
        favorites.stream().forEach(f ->{
            Movies movie = moviesService.getById(f.getMId(), f.getUId());
            movies.add(movie);
        });
        pageResponse.setRows(movies);
        return  pageResponse;
    }
}
