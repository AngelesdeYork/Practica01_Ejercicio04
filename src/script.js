// Definimos un array de preguntas y respuestas
const data = [
    ['Lugar de la casa donde se preparan los alimentos', 'Cocina.jpeg'],
    ['Lugar de la casa donde se duerme', 'Dormitorio.jpg'],
    ['Lugar de la casa donde se ve la television', 'Sala.jpg'],
    ['Lugar de la casa donde se lava la ropa', 'Lavanderia.jpg'],
    ['Lugar de la casa donde se toma una ducha', 'Bano.jpg'],
    ['Lugar de la casa donde se almacenan objetos', 'Bodega.jpg'],
    ['Lugar de la casa donde se come en familia', 'Comedor.jpg'],
    ['Lugar de la casa donde se guarda el coche', 'Garaje.jpg'],
    ['Lugar de la casa donde se hacen ejercicios', 'Gimnasio.jpg']
];


// Variable para almacenar la puntuación
let score = 0;

// Elementos del DOM
const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const retryButton = document.getElementById('retry');

// Función para renderizar el cuestionario
function renderQuiz() {
    // Limpiamos el contenedor del cuestionario
    quizContainer.innerHTML = `
    <tr>
        <th>#</th>
        <th>Imagen</th>
        <th>Descripcion</th>
        <th>Respuesta</th>
    </tr>
    `;
    // Iteramos sobre cada pregunta y generamos las filas correspondientes en la tabla
    data.forEach((item, index) => {
        const [description, image] = item;
        quizContainer.innerHTML += `
        <tr>
            <td>${index + 1}</td>
            <td><img src="img/${image}" alt="${description}"></td>
            <td>${description}</td>
            <td><input type="text" id="answer-${index}"></td>
        </tr>
        `;
    });
    // Agregamos un botón para aplicar el cuestionario
    quizContainer.innerHTML += '<tr><td colspan="4"><button onclick="checkAnswers()" id="check-button">Aplicar Cuestionario</button></td></tr>';
}

// Función para verificar las respuestas
function checkAnswers() {
    // Deshabilitamos el botón para evitar múltiples envíos del formulario
    document.getElementById('check-button').disabled = true;

    // Verificamos si hay algún input vacío
    const inputs = document.querySelectorAll('input[type="text"]');
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].value.trim() === '') {
            alert('Por favor, responde todas las preguntas antes de aplicar el cuestionario.');
            // Habilitamos el botón nuevamente
            document.getElementById('check-button').disabled = false;
            return; // Salimos de la función sin procesar las respuestas
        }
    }

    // Limpiamos el contenedor de resultados
    resultContainer.innerHTML = `
    <tr>
        <th>#</th>
        <th>Imagen</th>
        <th>Descripcion</th>
        <th>Respuesta Usuario</th>
        <th>Respuesta Correcta</th>
    </tr>
    `;
    // Iteramos sobre cada pregunta y comparamos la respuesta del usuario con la respuesta correcta
    data.forEach((item, index) => {
        const [description, image] = item;
        const correctAnswer = image.split('.')[0]; // Obtenemos el nombre del archivo sin la extensión
        const userAnswer = document.getElementById(`answer-${index}`).value.trim();

        const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase(); // Comparamos las respuestas de forma insensible a mayúsculas y minúsculas
        score += isCorrect ? 1 : 0;

        const lineClass = isCorrect ? 'correct' : 'incorrect';
        // Agregamos una fila para cada pregunta y mostramos la respuesta del usuario y la respuesta correcta
        resultContainer.innerHTML += `
        <tr class="${lineClass}">
            <td>${index + 1}</td>
            <td><img src="img/${image}" alt="${description}"></td>
            <td>${description}</td>
            <td><span style="color: black;">${userAnswer}</span></td>
            <td>${correctAnswer}</td>
        </tr>
        `;
    });
    // Agregamos una fila para mostrar la puntuación final
    resultContainer.innerHTML += `
    <tr>
        <td colspan="5" style="text-align: center;">Puntuacion: ${score}/${data.length}</td>
    </tr>`;
    // Mostramos el botón para volver a intentar
    retryButton.style.display = 'block';
    retryButton.style.margin = '0 auto'; // Centramos el botón
}
// Función para reiniciar el cuestionario
function retryQuiz() {
    score = 0; // Reseteamos la puntuación
    quizContainer.innerHTML = ''; // Limpiamos el contenedor del cuestionario
    resultContainer.innerHTML = ''; // Limpiamos el contenedor de resultados
    retryButton.style.display = 'none'; // Ocultamos el botón de volver a intentar
    renderQuiz(); // Volvemos a renderizar el cuestionario
}

// Renderizamos el cuestionario cuando se carga la página
renderQuiz();
