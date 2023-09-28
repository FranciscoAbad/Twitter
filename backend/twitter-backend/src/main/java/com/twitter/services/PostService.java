package com.twitter.services;


import com.twitter.dto.CreatePostDTO;
import com.twitter.models.ApplicationUser;
import com.twitter.models.Post;
import com.twitter.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@Transactional
public class PostService {

    private final PostRepository postRepo;

    @Autowired

    public PostService(PostRepository postRepo) {
        this.postRepo = postRepo;
    }

    public Post creatPost(CreatePostDTO dto){
        Post p=new Post();
        p.setContent(dto.getContent());
        if(dto.getScheduled()){
            p.setPostedDate(dto.getScheduledDate());
        }else{
            p.setPostedDate(new Date());
        }
        p.setAuthor(dto.getAuthor());
        p.setReplies(dto.getReplies());
        p.setScheduled(dto.getScheduled());
        p.setScheduledDate(dto.getScheduledDate());
        p.setAudience(dto.getAudience());
        p.setReplyRestriction(dto.getReplyRestriction());


        try{
            Post posted= postRepo.save(p);
            return posted;
        }catch (Exception e){
            return null;
        }
    }

    public List<Post> getAllPosts(){
        return postRepo.findAll();
    }

    public Post getPostById(Integer id){
        return postRepo.findById(id).get();
    }

    public Set<Post> getAllPostByAuthor(ApplicationUser author){
        Set<Post> userPost=postRepo.findByAuthor(author).orElse(new HashSet<>());

        return userPost;
    }

    public void deletePost(Post p){
        postRepo.delete(p);
    }

}
