package com.lxq.movie.api;

import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Movies;
import com.lxq.movie.service.DiscussService;
import com.lxq.movie.service.MoviesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pers.vankid.common.model.base.CommonResponse;
import pers.vankid.common.utils.page.PageUtil;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 12:39
 **/
@RestController
@RequestMapping("movie")
public class MovieController {

    @Autowired
    private MoviesService moviesService;

    /**
     * 新增电影
     * @author ls
     * @date 2019-11-21 20:21:12
     * @param movies
     * @return
     **/
    @PostMapping("")
    CommonResponse save(Movies movies)throws Exception{
       return CommonResponse.buildAddSuccessResponse(moviesService.save(movies));
    }

//    @PutMapping("")
//    CommonResponse update(Movies movies)throws Exception{
//        return CommonResponse.buildUpdateSuccessResponse(moviesService.update(movies));
//    }
//
//
//    @DeleteMapping("{id}")
//    CommonResponse delete(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildDelSuccessResponse(moviesService.delete(id));
//    }

    /**
     * 获取电影详情
     * @param id
     * @param uId
     * @return
     * @throws Exception
     */
    @GetMapping("info/{id}/{uId}")
    CommonResponse getById(@PathVariable("id")Integer id,@PathVariable("uId")Integer uId)throws Exception{
        return CommonResponse.buildGetSuccessResponse(moviesService.getById(id,uId));
    }

    /**
     * 获取电影列表
     * @author ls
     * @date 2019-11-21 20:20:34
     * @param movies
     * @param uId
     * @param num
     * @param size
     * @return
     **/
    @PostMapping("list/{num}/{size}")
    CommonResponse list(Movies movies,Integer uId, @PathVariable("num") int num,@PathVariable("size") int size)throws Exception{
        List<Movies> list = moviesService.list(movies,uId, num, size);
        return CommonResponse.buildGetSuccessResponse(PageUtil.getPageResponse(list));
    }
}
