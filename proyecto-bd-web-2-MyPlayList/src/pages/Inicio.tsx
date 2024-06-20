import React from 'react';
import "./Inicio.css";
import { Link, useNavigate } from 'react-router-dom';

const Inicio = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => {
            alert('Bienvenido al sistema');
            navigate('form');
        }, 1500);
    };
    
    const handleClick2 = () => {
        setTimeout(() => {
            alert('Bienvenido al Theater');
            navigate('/theater');
        }, 1500);
    };

    return (
        <section>
            <h1>¡Bienvenido a MY PLAY-LIST!</h1>
            <hr></hr>
            <p>Explora el fascinante mundo del cine con nosotros, donde cada película cuenta una historia única y emocionante. Desde los clásicos atemporales hasta los últimos éxitos de taquilla, estamos aquí para llevarte en un viaje a través de la magia del cine.</p>
            <p>Ya seas un cinéfilo ávido en busca de recomendaciones nuevas o alguien que simplemente busca una buena película para ver esta noche, estamos aquí para ayudarte a descubrir tu próxima película favorita. Únete a nosotros mientras exploramos, celebramos y discutimos el arte cinematográfico en todas sus formas.</p>
            <p>¡Prepárate para sumergirte en un mundo de emociones, narrativas cautivadoras y personajes inolvidables! Bienvenido a MY PLAY-LIST, donde el cine cobra vida.</p>
            <hr></hr>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '15px', height: '20vh' }}>
                <button onClick={() => handleClick()}> Loggin </button>
                <Link to="/Contacto"> Contacto </Link>
                <hr></hr>
                <button onClick={() => handleClick2()}> Theater </button>
            </div>
        </section>
    );
};

export default Inicio;