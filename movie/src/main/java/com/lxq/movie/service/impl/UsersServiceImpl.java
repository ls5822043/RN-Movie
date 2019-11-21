package com.lxq.movie.service.impl;

import com.lxq.movie.mapper.UsersMapper;
import com.lxq.movie.model.Movies;
import com.lxq.movie.model.Users;
import com.lxq.movie.service.UsersService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.DigestUtils;
import pers.vankid.common.utils.page.PageUtil;
import tk.mybatis.mapper.entity.Example;

import java.util.List;

/**
 * @Des:
 * @Author: ls
 * @Date: 2019-11-17 02:12
 **/
@Service
public class UsersServiceImpl implements UsersService {

    @Autowired
    private UsersMapper usersMapper;

    @Override
    public Users save(Users users) {
        users.setCover("http://www.16sucai.com/uploadfile/2013/0616/20130616030824963.png");
        users.setPassWord(DigestUtils.md5DigestAsHex(users.getPassWord().getBytes()));
        usersMapper.insertSelective(users);
        return users;
    }

    @Override
    public Boolean update(Users users) {
        return usersMapper.updateByPrimaryKeySelective(users)>0;
    }

    @Override
    public Boolean delete(Integer id) {
        return usersMapper.deleteByPrimaryKey(id)>0;
    }

    @Override
    public Users getById(Integer id) {
        return usersMapper.selectByPrimaryKey(id);
    }

    @Override
    public Boolean getByName(String userName) {
        Example example=new Example(Users.class);
        example.createCriteria().andEqualTo("userName",userName);

        return usersMapper.selectCountByExample(example)>0;
    }

    @Override
    public Users loginUser(Users users) {
        Example example=new Example(Users.class);
        example.createCriteria().andEqualTo("userName",users.getUserName()).andEqualTo("passWord",DigestUtils.md5DigestAsHex(users.getPassWord().getBytes()));
        List<Users> usersList = usersMapper.selectByExample(example);
        if(usersList.size()>0){
            return  usersList.get(0);
        }else{
            return null;
        }
    }

    @Override
    public List<Users> list(Users users, int num, int size) {
        PageUtil.start(num, size);
        List<Users> usersList = usersMapper.selectAll();

        return usersList;
    }
}
