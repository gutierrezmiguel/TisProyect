package com.pwa.ovaApi.Interfaces;

import com.pwa.ovaApi.Entities.Ova;

import java.util.List;
import java.util.Optional;

public interface IOva {
    List<Ova> getAllOvas();

    Optional<Ova> getOvaById(Long idOva);
}
