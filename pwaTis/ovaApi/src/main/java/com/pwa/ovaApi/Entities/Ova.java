package com.pwa.ovaApi.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "ova")
public class Ova {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Ova")
    private Long idOva;

    @Column(name = "title")
    @NotBlank
    @NotNull
    private String title;

    @Column(name = "creator")
    @NotBlank
    @NotNull
    private String creator;

    @Column(name = "subject")
    @NotBlank
    @NotNull
    private String subject;

    @Column(name = "description")
    @NotBlank
    @NotNull
    private String description;

    @Column(name = "publisher")
    @NotBlank
    @NotNull
    private String publisher;

    @Column(name = "contributor")
    @NotBlank
    @NotNull
    private String contributor;

    @Column(name = "date")
    @NotBlank
    @NotNull
    private String date;

    @Column(name = "type")
    @NotBlank
    @NotNull
    private String type;

    @Column(name = "format")
    @NotBlank
    @NotNull
    private String format;

    @Column(name = "identifier")
    @NotBlank
    @NotNull
    private String identifier;

    @Column(name = "source")
    @NotBlank
    @NotNull
    private String source;

    @Column(name = "language")
    @NotBlank
    @NotNull
    private String language;

    @Column(name = "relation")
    @NotBlank
    @NotNull
    private String relation;

    @Column(name = "coverage")
    @NotBlank
    @NotNull
    private String coverage;

    @Column(name = "rights")
    @NotBlank
    @NotNull
    private String rights;

    @Column(name = "link")
    private String ovaLink;

    @Column(name = "ova_File")
    @Lob
    private byte[] ovaFile;

    @JsonIgnore
    @OneToMany(mappedBy = "ova")
    private Set<Score> scores;
}
