package com.lxq.movie.api;

import com.lxq.movie.model.Discuss;
import com.lxq.movie.service.DiscussService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import pers.vankid.common.model.base.CommonResponse;
import pers.vankid.common.utils.page.PageResponse;
import pers.vankid.common.utils.page.PageUtil;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 12:39
 **/
@RestController
@RequestMapping("discuss")
public class DiscussController {

    @Autowired
    private DiscussService discussService;

    /*
     * 新增评论
     * @author ls
     * @date 2019-11-21 20:18:17
     * @param discuss
     * @return
     **/
    @PostMapping("")
    CommonResponse save(Discuss discuss)throws Exception{
       return CommonResponse.buildAddSuccessResponse(discussService.save(discuss));
    }

//    @PutMapping("")
//    CommonResponse update(Discuss discuss)throws Exception{
//        return CommonResponse.buildUpdateSuccessResponse(discussService.update(discuss));
//    }
//
//    @DeleteMapping("{id}")
//    CommonResponse delete(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildDelSuccessResponse(discussService.delete(id));
//    }
//
//    @GetMapping("info/{id}")
//    CommonResponse getById(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildGetSuccessResponse(discussService.getById(id));
//    }

    /**
     * 评论列表查询
     * @author ls
     * @date 2019-11-21 20:18:40
     * @param discuss
     * @param num
     * @param size
     * @return
     **/
    @PostMapping("list/{num}/{size}")
    CommonResponse list(Discuss discuss, @PathVariable("num") int num,@PathVariable("size") int size)throws Exception{
        return CommonResponse.buildGetSuccessResponse(PageUtil.getPageResponse(discussService.list(discuss,num,size)));
    }
}
