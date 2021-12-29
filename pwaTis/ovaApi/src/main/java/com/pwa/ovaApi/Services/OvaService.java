package com.pwa.ovaApi.Services;

import com.pwa.ovaApi.Entities.Ova;
import com.pwa.ovaApi.Interfaces.IOva;
import com.pwa.ovaApi.Repositories.OvaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OvaService implements IOva {

    private final OvaRepository ovaRepository;

    @Autowired
    public OvaService(OvaRepository ovaRepository) {
        this.ovaRepository = ovaRepository;
    }

    @Override
    public List<Ova> getAllOvas() {
        return ovaRepository.findAll();
    }

    @Override
    public Optional<Ova> getOvaById(Long idOva) {
        return ovaRepository.findById(idOva);
    }
}
