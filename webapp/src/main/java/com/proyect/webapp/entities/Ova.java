package com.proyect.webapp.entities;

import lombok.*;

import javax.persistence.*;
import java.io.File;

//LOMBOK
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
//JPA
@Entity
@Table(name = "OVA")
public class Ova {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idOva")
    private Integer idOva;

    @Column(name = "title")
    private String title;

    @Column(name = "creator")
    private String creator;

    @Column(name = "subject")
    private String subject;

    @Column(name = "description")
    private String description;

    @Column(name = "publisher")
    private String publisher;

    @Column(name = "contributor")
    private String contributor;

    @Column(name = "date")
    private String date;

    @Column(name = "type")
    private String type;

    @Column(name = "format")
    private String format;

    @Column(name = "identifier")
    private String identifier;

    @Column(name = "source")
    private String source;

    @Column(name = "language")
    private String language;

    @Column(name = "relation")
    private String relation;

    @Column(name = "coverage")
    private String coverage;

    @Column(name = "rights")
    private String rights;

    @Column(name = "rating")
    private String rating;

    @Column(name = "ova")
    private String ova;


}
