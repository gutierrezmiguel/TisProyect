package com.pwa.ovaApi.Interfaces;

import com.pwa.ovaApi.Entities.Score;

import java.util.Optional;

public interface IScore {
    Optional<Score> getScoreByUserAndOva(Long idUser , Long idOva);

    void mergeScore(Score score);

    Optional<Double> getAverageScoreByOva(Long idOva);
}
