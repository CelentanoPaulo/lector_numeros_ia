package com.lectornumeroIA.lectorNumerosIA.service;



import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lectornumeroIA.lectorNumerosIA.model.Usuario;
import com.lectornumeroIA.lectorNumerosIA.repository.UsuarioRepository;

@Service
public class UsuarioService 
{
    @Autowired //conecta directamente con usuariorepository sin tener que hacer un new.
    private UsuarioRepository usuarioRepository;

    public Usuario registrarUsuario(Usuario nuevoUsuario)
    {
        return usuarioRepository.save(nuevoUsuario); //guarda el usuario en la base de datos
    }

    public Usuario autenticarUsuario(String username,String password)
    {
        Optional<Usuario> usuarioOptional =usuarioRepository.findByUsername(username);

        if(usuarioOptional.isEmpty()) //verifica que el usuario exista
        {
            throw new RuntimeException("Error: el usuario no existe");
        }

        Usuario usuarioEncontrado = usuarioOptional.get();

        if (!password.equals(usuarioEncontrado.getPassword())) //verifica que la contraseña exista
        {
            throw new RuntimeException("Error: Contraseña incorrecta");
        }
        return usuarioEncontrado;
        


    }

}
