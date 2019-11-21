package com.lxq.movie.api;

import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Users;
import com.lxq.movie.service.DiscussService;
import com.lxq.movie.service.UsersService;
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
@RequestMapping("user")
public class UsersController {

    @Autowired
    private UsersService usersService;

    /**
     * 新增用户
     * @author ls
     * @date 2019-11-21 20:21:33
     * @param users
     * @return
     **/
    @PostMapping("")
    CommonResponse save(Users users)throws Exception{
       return CommonResponse.buildAddSuccessResponse(usersService.save(users));
    }

//    @PutMapping("")
//    CommonResponse update(Users users)throws Exception{
//        return CommonResponse.buildUpdateSuccessResponse(usersService.update(users));
//    }
//
//    @DeleteMapping("{id}")
//    CommonResponse delete(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildDelSuccessResponse(usersService.delete(id));
//    }
//
//    @GetMapping("info/{id}")
//    CommonResponse getById(@PathVariable("id")Integer id)throws Exception{
//        return CommonResponse.buildGetSuccessResponse(usersService.getById(id));
//    }

    /**
     * 检测用户名
     * @author ls
     * @date 2019-11-21 20:21:59
     * @param userName
     * @return
     **/
    @GetMapping("check/{userName}")
    CommonResponse check(@PathVariable("userName")String userName)throws Exception{
        return CommonResponse.buildGetSuccessResponse(usersService.getByName(userName));
    }


//    @PostMapping("info")
//    CommonResponse loginUser(Users users)throws Exception{
//        return CommonResponse.buildGetSuccessResponse(usersService.loginUser(users));
//    }

    /**
     * 获取用户列表
     * @author ls
     * @date 2019-11-21 20:22:22
     * @param users
     * @param num
     * @param size
     * @return
     **/
//    @PostMapping("list/{num}/{size}")
//    CommonResponse list(Users users, @PathVariable("num") int num, @PathVariable("size") int size)throws Exception{
//        return CommonResponse.buildGetSuccessResponse(PageUtil.getPageResponse(usersService.list(users,num,size)));
//    }
}
