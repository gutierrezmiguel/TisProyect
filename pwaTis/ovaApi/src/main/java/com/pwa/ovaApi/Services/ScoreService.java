package com.pwa.ovaApi.Services;

import com.pwa.ovaApi.Entities.Score;
import com.pwa.ovaApi.Interfaces.IScore;
import com.pwa.ovaApi.Repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScoreService implements IScore {

    private final ScoreRepository scoreRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository) {
        this.scoreRepository = scoreRepository;
    }


    @Override
    public Optional<Score> getScoreByUserAndOva(Long idUser, Long idOva) {
        return scoreRepository.getScoreByUserAndOva(idOva,idUser);
    }

    @Override
    public void mergeScore(Score score) {
            scoreRepository.save(score);
    }

    @Override
    public Optional<Double> getAverageScoreByOva(Long idOva) {
        return scoreRepository.getAverageScoreByOva(idOva);
    }

}
