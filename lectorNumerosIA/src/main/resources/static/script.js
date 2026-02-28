// --- MANEJO DE PANTALLAS ---
function toggleForms() {
    document.getElementById('loginCard').classList.toggle('hidden');
    document.getElementById('registerCard').classList.toggle('hidden');
}

function mostrarPantallaLienzo(username) {
    document.getElementById('loginCard').classList.add('hidden');
    document.getElementById('registerCard').classList.add('hidden');
    document.getElementById('appCard').classList.remove('hidden');
    document.getElementById('saludoUsuario').innerText = "Hola " + username + ", dibujá un número";
    iniciarLienzo(); // Prendemos la pizarra
}

// --- CONEXIÓN CON TU BACKEND (SPRING BOOT) ---
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('regUsername').value;
    const pass = document.getElementById('regPassword').value;

    try {
        const response = await fetch('/api/usuarios/registro', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        if (response.ok) {
            alert("¡Usuario registrado con éxito! Ahora podés ingresar.");
            toggleForms();
        } else {
            alert("Error al registrar el usuario.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const user = document.getElementById('loginUsername').value;
    const pass = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        if (response.ok) {
            // ¡MAGIA! Si el login es exitoso, abrimos la Pantalla 2
            mostrarPantallaLienzo(user);
        } else {
            alert("Usuario o contraseña incorrectos.");
        }
    } catch (error) {
        console.error("Error:", error);
    }
});


// --- ARQUITECTURA DEL LIENZO (CANVAS) ---
let lienzo, ctx, dibujando = false;

function iniciarLienzo() {
    lienzo = document.getElementById('lienzo');
    ctx = lienzo.getContext('2d');
    
    // Configuración del pincel (Trazo blanco, fondo negro)
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, lienzo.width, lienzo.height);
    ctx.lineWidth = 15;
    ctx.lineCap = "round";
    ctx.strokeStyle = "white";

    // Eventos para Computadora (Mouse)
    lienzo.addEventListener('mousedown', iniciarDibujo);
    lienzo.addEventListener('mousemove', dibujar);
    lienzo.addEventListener('mouseup', detenerDibujo);
    lienzo.addEventListener('mouseout', detenerDibujo);

    // Eventos para Celular (Touch)
    lienzo.addEventListener('touchstart', iniciarDibujoTouch);
    lienzo.addEventListener('touchmove', dibujarTouch);
    lienzo.addEventListener('touchend', detenerDibujo);
}

// Funciones de dibujo
function obtenerPosicion(e) {
    const rect = lienzo.getBoundingClientRect();
    return {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
    };
}

function iniciarDibujo(e) { dibujando = true; dibujar(e); }
function iniciarDibujoTouch(e) {
    e.preventDefault(); // Evita scroll en el celu
    dibujando = true; 
    dibujarTouch(e); 
}
function detenerDibujo() { dibujando = false; ctx.beginPath(); }

function dibujar(e) {
    if (!dibujando) return;
    const pos = obtenerPosicion(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

function dibujarTouch(e) {
    if (!dibujando) return;
    e.preventDefault();
    const rect = lienzo.getBoundingClientRect();
    const pos = {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
    };
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
}

// Botón Limpiar
document.getElementById('btnLimpiar').addEventListener('click', () => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, lienzo.width, lienzo.height);
    document.getElementById('resultadoIA').innerText = "";
});

// --- BOTÓN ADIVINAR (CONEXIÓN REAL CON LA IA) ---
document.getElementById('btnPredecir').addEventListener('click', async () => {
    const resultadoTexto = document.getElementById('resultadoIA');
    resultadoTexto.innerText = "Pensando... 🤔";

    try {
        // 1. Crear un lienzo invisible de 28x28 para la IA
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = 28;
        tempCanvas.height = 28;
        const tCtx = tempCanvas.getContext('2d');

        // 2. Dibujamos nuestro lienzo grande (280x280) en el chiquito (28x28)
        // Esto hace el reescalado automático que la IA necesita
        tCtx.drawImage(lienzo, 0, 0, 28, 28);

        // 3. Extraer los píxeles
        const imgData = tCtx.getImageData(0, 0, 28, 28);
        const pixeles = [];

        for (let i = 0; i < imgData.data.length; i += 4) {
            // Como el fondo es negro y el trazo es blanco, 
            // el valor de imgData.data[i] (canal Rojo) nos sirve perfecto.
            // Normalizamos de 0-255 a 0.0-1.0
            pixeles.push(imgData.data[i] / 255);
        }

        // 4. Llamada al Backend de Spring Boot (Usando tu IP de red local)
        const response = await fetch('http://192.168.0.151:8080/api/ia/predecir', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pixeles)
        });

        if (response.ok) {
            const numeroPredicho = await response.json();
            resultadoTexto.innerText = "¡Es un " + numeroPredicho + "! 🎯";
        } else {
            resultadoTexto.innerText = "Error en el servidor ❌";
        }

    } catch (error) {
        console.error("Error al conectar con la IA:", error);
        resultadoTexto.innerText = "Servidor desconectado 🔌";
    }
});
