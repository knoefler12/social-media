package com.example.backend.controllers;

import com.example.backend.models.Post;
import com.example.backend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Posts {
    @Autowired
    PostRepository posts;

    @PostMapping("/posts")
    public Post addPost(@RequestBody Post newPost){
        newPost.setId(null);
        return posts.save(newPost);
    }

    @PatchMapping("/posts/{id}")
    public String patchPost(@PathVariable int id, @RequestBody Post newPost){
        return posts.findById(id).map(foundPost ->{
            if(newPost.getText()!=null) foundPost.setText(newPost.getText());
            posts.save(foundPost);
            return "Post patched";
        }).orElse("Post was not found");
    }

    @DeleteMapping("/posts/{id}")
    public void deletePost(@PathVariable int id){
        posts.deleteById(id);
    }

    @GetMapping("/posts")
    public List<Post> getPosts(){
        return posts.findAll();
    }

    @GetMapping("/posts/hashtag/{hashtag}")
    public List<Post> getPostsFromHashtag(@PathVariable String hashtag){
        return posts.findHashTags(hashtag);
    }
}
