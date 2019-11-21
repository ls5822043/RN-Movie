package com.lxq.movie.service.impl;

import com.lxq.movie.mapper.DiscussMapper;
import com.lxq.movie.model.Discuss;
import com.lxq.movie.model.Users;
import com.lxq.movie.service.DiscussService;
import com.lxq.movie.service.UsersService;
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
public class DiscussServiceImpl implements DiscussService {

    @Autowired
    private DiscussMapper discussMapper;

    @Override
    public Boolean save(Discuss discuss) {
        return discussMapper.insertSelective(discuss)>0;
    }

    @Override
    public Boolean update(Discuss discuss) {
        return discussMapper.updateByPrimaryKeySelective(discuss)>0;
    }

    @Override
    public Boolean delete(Integer id) {
        return discussMapper.deleteByPrimaryKey(id)>0;
    }

    @Override
    public Discuss getById(Integer id) {
        return discussMapper.selectByPrimaryKey(id);
    }

    @Autowired
    private UsersService usersService;

    @Override
    public List<Discuss> list(Discuss discuss, int num, int size) {
        PageUtil.start(num, size);
        Example example=new Example(Discuss.class);
        example.orderBy("createTime").desc();
        example.createCriteria().andEqualTo("mId",discuss.getMId());
        List<Discuss> discusses = discussMapper.selectByExample(example);
        discusses.stream().forEach(discuss1 -> {
            Users byId = usersService.getById(discuss1.getUId());
            discuss1.setUserName(byId.getUserName());
            discuss1.setUserCover(byId.getCover());
        });
        return discusses;
    }
}
