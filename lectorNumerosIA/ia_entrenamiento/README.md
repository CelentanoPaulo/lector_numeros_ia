#  Módulo de Entrenamiento de IA (Reconocimiento de Dígitos)

Este directorio contiene el entorno de experimentación y la lógica de Ciencia de Datos utilizada para entrenar la Inteligencia Artificial del sistema.

##  Proceso y Metodología

El desarrollo del modelo se realizó mediante un enfoque de Deep Learning, utilizando Python y TensorFlow.

* **Dataset Utilizado:** Se empleó el clásico dataset **MNIST**, el cual contiene 70,000 imágenes de números dibujados a mano (del 0 al 9) en formato de 28x28 píxeles.
* **Arquitectura de la Red:** Se diseñó una **Red Neuronal Convolucional (CNN)**, ideal para el procesamiento de imágenes. Las capas principales incluyen:
  * Capas `Conv2D` para la extracción de características visuales (bordes, curvas).
  * Capas de `MaxPooling` para reducir la dimensionalidad y evitar el sobreajuste.
  * Capas `Dense` (totalmente conectadas) para la clasificación final mediante la función de activación Softmax.
* **Entrenamiento (Notebook):** El archivo `prueba_gpu.ipynb` contiene el código paso a paso del entrenamiento, optimizado para correr con aceleración gráfica (GPU).

## Resultado Final: Exportación

Tras el entrenamiento, el modelo alcanzó un alto nivel de precisión en la predicción de trazos nuevos. 

Para poder integrar este "cerebro" con el Backend de Java (Spring Boot), la red neuronal ya entrenada se exportó y empaquetó en el archivo binario **`modelo_numeros.h5`**. Este archivo de pesos es el que lee la librería DeepLearning4J en el servidor de producción.
