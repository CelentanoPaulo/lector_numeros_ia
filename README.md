#  Lector de Números con IA - Full-Stack 

Un sistema integral que combina Inteligencia Artificial, un Backend robusto y una interfaz web interactiva para reconocer números escritos a mano en tiempo real. 

---

##  Arquitectura e Integración del Sistema

El mayor desafío y logro de este proyecto es la **integración** de ecosistemas distintos. El sistema se divide en cuatro pilares que interactúan de forma fluida:

###  Frontend 
* **Tecnologías:** HTML5 Canvas, CSS3, Vanilla JavaScript, Bootstrap.
* **Rol:** Interacción y preprocesamiento de datos.
* **Integración:** Cuando el usuario dibuja en el lienzo de 280x280 píxeles, JavaScript captura el trazo. Antes de enviarlo, escala internamente el dibujo a 28x28 píxeles, normaliza los colores a valores flotantes (entre 0 y 1) y convierte la matriz bidimensional en un array unidimensional. Este array se envía mediante una petición HTTP POST al servidor.

### Backend 
* **Tecnologías:** Java 17, Spring Boot, Maven, DeepLearning4J.
* **Rol:** Motor principal y puente tecnológico.
* **Integración:** Expone una API REST que recibe los datos normalizados del Frontend. Su tarea más crítica es la interoperabilidad: utiliza la librería **DeepLearning4J** para importar el modelo matemático (`.h5`) generado en Python. Esto permite ejecutar la inferencia de la IA directamente dentro de la Java Virtual Machine (JVM), logrando predicciones ultra rápidas sin depender de un servidor Python externo.

### Base de Datos 
* **Tecnologías:** PostgreSQL, Spring Data JPA / Hibernate.
* **Rol:** Almacenamiento seguro y relacional.
* **Integración:** Conectada directamente al core de Spring Boot. Se encarga de la gestión de identidades (usuarios), validación de sesiones y almacenamiento del historial de consultas. Cada vez que la IA realiza una predicción, el Backend registra el evento en la base de datos para mantener la trazabilidad.

### Inteligencia Artificial 
* **Tecnologías:** Python, TensorFlow, Keras.
* **Rol:** Modelado matemático y reconocimiento de patrones.
* **Integración:** Ubicado en la carpeta `/ia_entrenamiento`, este módulo representa la fase de Ciencia de Datos. Se diseñó y entrenó una Red Neuronal Convolucional (CNN) utilizando el dataset MNIST. El resultado del aprendizaje se empaquetó y exportó como un archivo de pesos estáticos, listo para ser consumido por el Backend de Java.

---

## Flujo de Ejecución en Tiempo Real

1. El usuario inicia sesión (validado contra PostgreSQL).
2. Dibuja un dígito en el Canvas del navegador.
3. El Frontend procesa la imagen y la transmite al endpoint de Spring Boot.
4. Spring Boot inyecta el array de datos en el modelo cargado por DL4J.
5. La red neuronal calcula las probabilidades y devuelve el resultado.
6. El Backend guarda el registro en la base de datos y envía la respuesta HTTP al cliente.
7. La interfaz web despliega el número reconocido en pantalla de forma instantánea.

---

## Stack Tecnológico Resumido

* **Ciencia de Datos:** Python 3, TensorFlow, Keras, NumPy.
* **Desarrollo Backend:** Java 17, Spring Boot 3, Spring Security, Hibernate.
* **Motor de Deep Learning en Java:** Eclipse DeepLearning4J (DL4J).
* **Base de Datos:** PostgreSQL.
* **Desarrollo Frontend:** JavaScript, HTML5 Canvas API, CSS3.

---

---

## Documentación del Módulo de IA

Para profundizar en los detalles técnicos de la fase de Ciencia de Datos, el preprocesamiento del dataset MNIST, la arquitectura de la Red Neuronal Convolucional (CNN) y las métricas de precisión obtenidas, te invito a consultar la documentación específica:

**[Ver detalles del Entrenamiento y Modelado de la IA](https://github.com/CelentanoPaulo/lector_numeros_ia/tree/main/lectorNumerosIA/ia_entrenamiento)**
