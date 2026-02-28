package com.lectornumeroIA.lectorNumerosIA.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.lectornumeroIA.lectorNumerosIA.model.Usuario;

import java.util.Optional;


public interface UsuarioRepository extends JpaRepository <Usuario,Long>
{
    public Optional<Usuario> findByUsername(String username);

}
