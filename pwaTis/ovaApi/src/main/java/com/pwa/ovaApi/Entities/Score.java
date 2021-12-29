package com.pwa.ovaApi.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "score")
public class Score {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_Score")
    private Long idScore;

    @ManyToOne
    @JoinColumn(name = "id_User" , nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "id_Ova", nullable = false )
    private Ova ova;

    @Column(name = "score_Number")
    private Double scoreNumber;
}
