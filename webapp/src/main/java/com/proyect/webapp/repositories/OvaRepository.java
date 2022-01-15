package com.proyect.webapp.repositories;

import com.proyect.webapp.entities.Ova;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.RequestMapping;

@Repository
public interface OvaRepository extends CrudRepository<Ova, Long> {

}
