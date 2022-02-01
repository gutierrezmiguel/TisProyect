package com.pwa.ovaApi.Controllers;

import com.pwa.ovaApi.Entities.Score;
import com.pwa.ovaApi.Services.ScoreService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@Controller
@RequestMapping(path = "/score")
public class ScoreController {

    private final ScoreService scoreService;

    @Autowired
    public ScoreController(ScoreService scoreService) {
        this.scoreService = scoreService;
    }

    @PostMapping(path = "/merge")
    public ResponseEntity<Score> mergeScore(@RequestBody Score score){
        scoreService.mergeScore(score);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(path = "/{idOva}/{idUser}")
    public ResponseEntity<Score> getScoreByUserAndOva(@PathVariable Long idOva , @PathVariable Long idUser){
        Optional<Score> score = scoreService.getScoreByUserAndOva(idUser,idOva);
        if (score.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity<>(score.get(),HttpStatus.OK);
        }
    }

    @GetMapping(path = "/avg/{idOva}",produces = "application/json")
    public ResponseEntity<Double> getAverageScoreByOva(@PathVariable Long idOva){
        Optional<Double> avgScore = scoreService.getAverageScoreByOva(idOva);
        if(avgScore.isEmpty()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }else{
            return new ResponseEntity<>(avgScore.get(),HttpStatus.OK);
        }
    }
}
