package com.pwa.ovaApi.Services;

import com.pwa.ovaApi.Entities.Ova;
import com.pwa.ovaApi.Entities.Score;
import com.pwa.ovaApi.Interfaces.IScore;
import com.pwa.ovaApi.Repositories.OvaRepository;
import com.pwa.ovaApi.Repositories.ScoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ScoreService implements IScore {

    private final ScoreRepository scoreRepository;

    private final OvaRepository ovaRepository;

    @Autowired
    public ScoreService(ScoreRepository scoreRepository, OvaRepository ovaRepository) {
        this.ovaRepository = ovaRepository;
        this.scoreRepository = scoreRepository;
    }


    @Override
    public Optional<Score> getScoreByUserAndOva(Long idUser, Long idOva) {
        return scoreRepository.getScoreByUserAndOva(idOva,idUser);
    }

    @Override
    public void mergeScore(Score score) {
            scoreRepository.save(score);
            Ova updatedOva = ovaRepository.getById(score.getScoreId().getOva().getIdOva());
            Optional<Double> ovaScore = scoreRepository.getAverageScoreByOva(score.getScoreId().getOva().getIdOva());
            if(ovaScore.isPresent()){

                double newScore = ovaScore.get();
                updatedOva.setRating(newScore);
                ovaRepository.save(updatedOva);
            }
    }

    @Override
    public Optional<Double> getAverageScoreByOva(Long idOva) {
        return scoreRepository.getAverageScoreByOva(idOva);
    }

}
