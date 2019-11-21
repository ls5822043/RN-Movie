package com.lxq.movie.service.impl;

import com.lxq.movie.mapper.MoviesMapper;
import com.lxq.movie.model.Favorite;
import com.lxq.movie.model.Movies;
import com.lxq.movie.service.FavoriteService;
import com.lxq.movie.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import pers.vankid.common.utils.page.PageUtil;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:13
 **/
@Service
public class MoviesServiceImpl implements MoviesService {

    @Autowired
    private MoviesMapper moviesMapper;

    @Override
    public Boolean save(Movies movies) {
        return moviesMapper.insertSelective(movies)>0;
    }

    @Override
    public Boolean update(Movies movies) {
        return moviesMapper.updateByPrimaryKeySelective(movies)>0;
    }

    @Override
    public Boolean delete(Integer id) {
        return moviesMapper.deleteByPrimaryKey(id)>0;
    }

    @Autowired
    private FavoriteService favoriteService;

    @Override
    public Movies getById(Integer id,Integer uId) {
        Movies movies = moviesMapper.selectByPrimaryKey(id);
        movies.setIsSave(favoriteService.isSave(uId,id));
        return movies;
    }

    @Override
    public List<Movies> list(Movies movies,Integer uId, int num, int size) {

        if(movies.getMType()!=3&&movies.getMType()!=null){
            PageUtil.start(num, size);
            Example example=new Example(Movies.class);
            example.createCriteria().andEqualTo("mType",movies.getMType());
            List<Movies> moviesList= moviesMapper.selectByExample(example);
            moviesList.stream().forEach(m ->{
                Boolean save = favoriteService.isSave(uId, m.getId());
                m.setIsSave(save);
            });
            return moviesList;
        }
        else{
            PageUtil.start(num, size);
            List<Movies> moviesList=moviesMapper.selectAll();
            moviesList.stream().forEach(m ->{
                Boolean save = favoriteService.isSave(uId, m.getId());
                m.setIsSave(save);
            });
            return moviesList;
        }
    }
}
