package com.lxq.movie.api;

import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Favorite;
import com.lxq.movie.service.DiscussService;
import com.lxq.movie.service.FavoriteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pers.vankid.common.model.base.CommonResponse;
import pers.vankid.common.utils.page.PageUtil;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 12:39
 **/
@RestController
@RequestMapping("favorite")
public class FavoriteController {

    @Autowired
    private FavoriteService favoriteService;

    /**
     * 新增收藏
     * @author ls
     * @date 2019-11-21 20:19:36
     * @param favorite
     * @return
     **/
    @PostMapping("")
    CommonResponse save(Favorite favorite)throws Exception{
       return CommonResponse.buildAddSuccessResponse(favoriteService.save(favorite));
    }

//    @PutMapping("")
//    CommonResponse update(Favorite favorite)throws Exception{
//        return CommonResponse.buildUpdateSuccessResponse(favoriteService.update(favorite));
//    }
//
//    @DeleteMapping("{id}")
//    CommonResponse delete(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildDelSuccessResponse(favoriteService.delete(id));
//    }

    /**
     * 删除用户收藏
     * @author ls
     * @date 2019-11-21 20:19:51
     * @param mId
     * @param uId
     * @return
     **/
    @DeleteMapping("{mId}/{uId}")
    CommonResponse delete(@PathVariable("mId")Integer mId,@PathVariable("uId")Integer uId)throws Exception{
        return CommonResponse.buildDelSuccessResponse(favoriteService.delete(mId,uId));
    }
//
//    @GetMapping("info/{id}")
//    CommonResponse getById(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildGetSuccessResponse(favoriteService.getById(id));
//    }

    /**
     * 获取收藏列表
     * @author ls
     * @date 2019-11-21 20:20:17
     * @param uId
     * @param num
     * @param size
     * @return
     **/
    @GetMapping("list/{uId}/{num}/{size}")
    CommonResponse list(@PathVariable("uId") Integer uId, @PathVariable("num") int num,@PathVariable("size") int size)throws Exception{
        return CommonResponse.buildGetSuccessResponse(favoriteService.list(uId,num,size));
    }
}
