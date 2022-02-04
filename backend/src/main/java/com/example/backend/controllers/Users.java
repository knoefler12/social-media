package com.example.backend.controllers;

import com.example.backend.models.User;
import com.example.backend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Users {

    @Autowired
    UserRepository user;

    @PostMapping("/users")
    public User addUser(@RequestBody User newUser){
        newUser.setId(null);
        return user.save(newUser);
    }

    /*@GetMapping("/users")
    public List<User> getUsers(){
        return user.findAll();
    }*/

    @GetMapping("/users/{username}/{password}")
    public User findUserByUsernameAndPassword(@PathVariable String username,@PathVariable String password) throws Exception {

        if(user.findUserByUsernameAndPassword(username,password)!=null){
            return user.findUserByUsernameAndPassword(username,password);
        }else{
            throw new Exception("User not found");
        }
    }
}
