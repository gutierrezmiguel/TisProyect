package com.proyect.webapp.entities;

import lombok.*;

import javax.persistence.*;

//LOMBOK
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//JPA
@Entity
@Table(name = "user")

public class LoginForm {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    private String username;
    private String password;

}

