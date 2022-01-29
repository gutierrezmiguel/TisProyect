package com.pwa.ovaApi.Entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@Entity
@Table(name = "score")
public class Score {

    @EmbeddedId
    private ScoreId scoreId;

    @Column(name = "score_Number")
    private Double scoreNumber;
}
