import {useNavigate} from 'react-router-dom';

const Contacto = () => {
    const navigate = useNavigate();

    const handleClick = () => {
        setTimeout(() => {
            alert('Regresando al Inicio');
            navigate('/');
        }, 1500);
    };

    return (
        <section>
            <h1>Contactos</h1>
            <hr></hr>
            <p>a22110067@ceti.mx          Guillermo Ávila Gudiño - 22110067 - 5°P</p>
            <hr></hr>
            <p>a22110054@ceti.mx      Hector Isaí Vargas de la Torre - 22110054 - 5°P</p>
            <hr></hr>
            <p>a22110141@ceti.mx        Hector Antonio Valle Garcia - 22110141 - 5°P</p>
            <hr></hr>
            
            <button onClick={() => handleClick()}>Regresar</button>
        </section>
    )
}

export default Contacto