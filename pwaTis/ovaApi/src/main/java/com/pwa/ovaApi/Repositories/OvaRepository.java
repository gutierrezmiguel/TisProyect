package com.pwa.ovaApi.Repositories;

import com.pwa.ovaApi.Entities.Ova;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OvaRepository extends JpaRepository<Ova,Long> {
}
