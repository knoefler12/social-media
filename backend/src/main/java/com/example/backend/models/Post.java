package com.example.backend.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;

import javax.persistence.*;
import java.util.List;

@Data
@Table(name = "Posts")
@Entity
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private int likes;

    @Column
    private String text;

    @Column
    private String date;

    @Column
    private String imagePath;

    @OneToOne()
    private User user;

    @OneToMany(mappedBy = "id", fetch = FetchType.LAZY,cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Comment> savedComment;
}

