package com.lectornumeroIA.lectorNumerosIA.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lectornumeroIA.lectorNumerosIA.model.Usuario;
import com.lectornumeroIA.lectorNumerosIA.service.UsuarioService;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController 
{
    @Autowired
    private UsuarioService usuarioService;
    
    @PostMapping("/registro")
     public Usuario registrarUsuario(@RequestBody Usuario nuevoUsuario)
     {
        return usuarioService.registrarUsuario(nuevoUsuario);
        //@RequestBody agarra lo que viene del front y lo convierte en un Usuario
        //luego ese usuario lo registramos llamando al metodo que esta en Service
        //y despues se retorna ese usuario registrado. 

     }

     @PostMapping("/login")
     public Usuario loginUsuario(@RequestBody Usuario credenciales)
     {
        return usuarioService.autenticarUsuario(credenciales.getUsername(), credenciales.getPassword());
        //aca pasa lo mismo con @RequestBody, y usamos el metodo para verificar que el usuario ya exista 
        // en la base de datos con el metodo que esta en Service para verificar, le pasamos por argumento 
        // el usuario (Username) y la contraseña (password)
     }
     
     
}
