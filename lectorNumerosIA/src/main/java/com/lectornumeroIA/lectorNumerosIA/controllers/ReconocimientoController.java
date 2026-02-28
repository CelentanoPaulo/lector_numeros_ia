package com.lectornumeroIA.lectorNumerosIA.controllers;

import com.lectornumeroIA.lectorNumerosIA.service.ReconocimientoService; // Importación corregida
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/ia")
@CrossOrigin("*")
public class ReconocimientoController {

    @Autowired
    private ReconocimientoService reconocimientoService;

    @PostMapping("/predecir")
    public int predecir(@RequestBody List<Float> pixeles) {
        float[] arrayPixeles = new float[pixeles.size()];
        for (int i = 0; i < pixeles.size(); i++) {
            arrayPixeles[i] = pixeles.get(i);
        }
        return reconocimientoService.predecir(arrayPixeles);
    }
}