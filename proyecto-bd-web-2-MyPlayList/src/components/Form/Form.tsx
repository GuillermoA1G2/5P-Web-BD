import React, { useState } from "react";
import "./Form.css";
import Data from "./Data";



const initialUsers = [
    { email: 'a22110067@ceti.mx', password: '22110067' },
];

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState(initialUsers);

    const handleInputChange = (setState) => {
        return (event) => {
            setState(event.target.value);
        }
    }

    const handleLogin = () => {
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setIsLoggedIn(true);
        } else {
            alert("Correo electrónico o contraseña incorrectos");
        }
    }

    const handleRegister = () => {
        const newUser = { email, password };
        setUsers([...users, newUser]);
        alert("Usuario registrado correctamente");
        setEmail("");
        setPassword("");
    }

    const redirectToPage = () => {
        window.location.href = "./src/components/PlayList/PlayList.tsx";
    }

    return (
        <>
            {isLoggedIn ? (
                redirectToPage()
            ) : (
                <div className="login-box">
                    <h2>Login</h2>
                    <form>
                        <div className="user-box">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={handleInputChange(setEmail)}
                                required
                            />
                            <label>Email</label>
                        </div>
                        <div className="user-box">
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={handleInputChange(setPassword)}
                                required
                            />
                            <label>Password</label>
                        </div>
                        <button onClick={handleLogin} className="btn">Iniciar sesión</button>
                        <button onClick={handleRegister} className="btn">Registrarse</button>
                    </form>
                </div>
            )}
        </>
    );
}

export default Form;