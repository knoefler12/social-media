package com.example.backend.models;

import lombok.Data;

import javax.persistence.*;

@Entity
@Table(name = "comments")
@Data
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column
    private String text;

    @Column
    private int likes;

    @OneToOne
    private User user;

    @ManyToOne
    @JoinColumn(name = "postId")
    private Post post;
}
