package com.lectornumeroIA.lectorNumerosIA.service;

import org.deeplearning4j.nn.modelimport.keras.KerasModelImport;
import org.deeplearning4j.nn.multilayer.MultiLayerNetwork;
import org.nd4j.linalg.api.ndarray.INDArray;
import org.nd4j.linalg.factory.Nd4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import java.io.InputStream;

@Service
public class ReconocimientoService {

    private MultiLayerNetwork modelo;

    @PostConstruct
    public void init() {
        try {
            // Cargamos el archivo directamente como un flujo de datos (más seguro)
            InputStream is = new ClassPathResource("modelo_numeros.h5").getInputStream();
            this.modelo = KerasModelImport.importKerasSequentialModelAndWeights(is);
            System.out.println("🚀 IA: ¡Modelo cargado exitosamente!");
        } catch (Exception e) {
            System.err.println("❌ Error al cargar la IA: " + e.getMessage());
            e.printStackTrace();
        }
    }

    public int predecir(float[] pixeles) {
        // La IA espera 1 fila con 784 píxeles
        INDArray input = Nd4j.create(pixeles).reshape(1, 784);
        INDArray output = modelo.output(input);
        
        // Retornamos el índice del número con mayor probabilidad
        return Nd4j.argMax(output, 1).getInt(0);
    }
}