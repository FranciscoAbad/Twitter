package com.twitter.controllers;


import com.twitter.dto.CreatePostDTO;
import com.twitter.models.ApplicationUser;
import com.twitter.models.Post;
import com.twitter.services.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/posts")
public class PostController {

    private final PostService postService;

    @Autowired
    public PostController(PostService postService) {
        this.postService = postService;
    }

    @GetMapping("/")
    public List<Post> getAllPosts(){
    return postService.getAllPosts();
    }

    @PostMapping("/")
    public Post createPost(@RequestBody CreatePostDTO postDTO){
        return postService.creatPost(postDTO);
    }

    @GetMapping("/id/{id}")
    public Post getPostById(@PathVariable("id") int id){
        return postService.getPostById(id);
    }

    @GetMapping("/author/{userId}")
    public Set<Post> getPostByAuthor(@PathVariable("userId") int userId){
        ApplicationUser author=new ApplicationUser();
        author.setUserId(userId);
        return postService.getAllPostByAuthor(author);
    }

    @DeleteMapping("/")
    public ResponseEntity<String> deletePost(@RequestBody Post p){
        postService.deletePost(p);
        return new ResponseEntity<String>("Post has been deleted", HttpStatus.OK);
    }
}
