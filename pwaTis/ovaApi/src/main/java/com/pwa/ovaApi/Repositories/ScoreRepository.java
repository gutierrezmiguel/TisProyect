package com.pwa.ovaApi.Repositories;

import com.pwa.ovaApi.Entities.Score;
import com.pwa.ovaApi.Entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ScoreRepository extends JpaRepository<Score,Long> {

    @Query(value =  "select tisproyect.score.* from tisproyect.score where tisproyect.score.id_ova = :idOva and tisproyect.score.id_user = :idUser",
            nativeQuery = true)
    Optional<Score> getScoreByUserAndOva(Long idOva,Long idUser);




    @Query(value = "select avg(tisproyect.score.score_number) from tisproyect.score where tisproyect.score.id_ova = :idOva",
    nativeQuery = true)
    Optional<Double> getAverageScoreByOva(Long idOva);

}
