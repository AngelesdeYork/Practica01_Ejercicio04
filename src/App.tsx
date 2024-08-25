// App.tsx
import React, { useState } from 'react';
import './style.css';

// Definimos un array de preguntas y respuestas
const data: [string, string][] = [
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

// Definimos una interfaz para el resultado
interface ResultItem {
    description: string;
    image: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}

const App: React.FC = () => {
    const [score, setScore] = useState<number>(0);
    const [answers, setAnswers] = useState<string[]>(Array(data.length).fill(''));
    const [result, setResult] = useState<ResultItem[]>([]);
    const [showRetry, setShowRetry] = useState<boolean>(false);

    const handleInputChange = (index: number, value: string) => {
        const newAnswers = [...answers];
        newAnswers[index] = value;
        setAnswers(newAnswers);
    };

    const checkAnswers = () => {
        // Verificamos si hay algún input vacío
        if (answers.some(answer => answer.trim() === '')) {
            alert('Por favor, responde todas las preguntas antes de aplicar el cuestionario.');
            return; // Salimos de la función sin procesar las respuestas
        }

        const newResult: ResultItem[] = data.map((item, index) => {
            const [description, image] = item;
            const correctAnswer = image.split('.')[0]; // Obtenemos el nombre del archivo sin la extensión
            const userAnswer = answers[index].trim();

            const isCorrect = userAnswer.toLowerCase() === correctAnswer.toLowerCase(); // Comparamos las respuestas de forma insensible a mayúsculas y minúsculas
            setScore(prevScore => prevScore + (isCorrect ? 1 : 0));

            return {
                description,
                image,
                userAnswer,
                correctAnswer,
                isCorrect
            };
        });

        setResult(newResult);
        setShowRetry(true);
    };

    const retryQuiz = () => {
        setScore(0); // Reseteamos la puntuación
        setAnswers(Array(data.length).fill('')); // Limpiamos las respuestas
        setResult([]); // Limpiamos el contenedor de resultados
        setShowRetry(false); // Ocultamos el botón de volver a intentar
    };

    return (
        <div>
            <h1 className="titulo">Practica de Vocabulario</h1>
            <table id="quiz">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Respuesta</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td><img src={`img/${item[1]}`} alt={item[0]} /></td>
                            <td>{item[0]}</td>
                            <td>
                                <input
                                    type="text"
                                    value={answers[index]}
                                    onChange={e => handleInputChange(index, e.target.value)}
                                    id={`answer-${index}`}
                                />
                            </td>
                        </tr>
                    ))}
                    <tr>
                        <td colSpan={4}>
                            <button onClick={checkAnswers} id="check-button">Aplicar Cuestionario</button>
                        </td>
                    </tr>
                </tbody>
            </table>
            <table id="result">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Imagen</th>
                        <th>Descripción</th>
                        <th>Respuesta Usuario</th>
                        <th>Respuesta Correcta</th>
                    </tr>
                </thead>
                <tbody>
                    {result.map((item, index) => (
                        <tr key={index} className={item.isCorrect ? 'correct' : 'incorrect'}>
                            <td>{index + 1}</td>
                            <td><img src={`img/${item.image}`} alt={item.description} /></td>
                            <td>{item.description}</td>
                            <td style={{ color: 'black' }}>{item.userAnswer}</td>
                            <td>{item.correctAnswer}</td>
                        </tr>
                    ))}
                    {result.length > 0 && (
                        <tr>
                            <td colSpan={5} style={{ textAlign: 'center' }}>
                                Puntuacion: {score}/{data.length}
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
            {showRetry && (
                <button id="retry" style={{ display: 'block', margin: '0 auto' }} onClick={retryQuiz}>
                    Volver a intentar
                </button>
            )}
        </div>
    );
};

export default App;
