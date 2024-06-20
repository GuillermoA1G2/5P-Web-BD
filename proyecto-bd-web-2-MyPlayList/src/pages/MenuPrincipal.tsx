import { Link } from "react-router-dom"

const MenuPrincipal = () => {
    return (
        <section>
            <h1>Menu Principal</h1>
            <p>Selecciona una opción</p>
                <Link to='/'>Inicio</Link>
                <Link to='/contacto'>Contacto</Link>
        </section>
    )
}

export default MenuPrincipal