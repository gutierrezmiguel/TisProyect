package com.proyect.webapp.services;

import com.proyect.webapp.entities.Ova;
import com.proyect.webapp.repositories.OvaRepository;
import com.proyect.webapp.interfaces.IOva;
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
    public List<Ova> listar() {
        return (List<Ova>) ovaRepository.findAll();
    }

    @Override
    public Optional<Ova> listarid(Long id) {

        return ovaRepository.findById(id);
    }

    @Override
    public int save(Ova o) {
        int res=0;
        Ova ova = ovaRepository.save(o);
        if(!ova.equals(null)){
            res=1;
        }
        return 0;
    }

    @Override
    public void delete(Long id) {
        ovaRepository.deleteById(id);
    }

    @Override
    public void editkey(String key, Ova o) {
        o.setKeyS3(key);
        save(o);
    }
}
