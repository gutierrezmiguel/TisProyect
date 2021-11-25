package com.proyect.webapp.interfaces;

import com.proyect.webapp.entities.Ova;

import java.util.List;
import java.util.Optional;


public interface IOva {
    public List<Ova>listar();
    public Optional<Ova> listarid(int id);
    public int save(Ova o);
    public void delete(int id);
}
