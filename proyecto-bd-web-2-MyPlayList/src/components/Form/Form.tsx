import React, { useEffect, useState } from "react";
import "./Form.css";
import Playlist from "../PlayList/PlayList";

const API_URL = "http://localhost:5173";

// Eliminando el usuario predefinido
const initialUsers = [];

function Form() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [users, setUsers] = useState(initialUsers);

    useEffect(() => {
        const userInStorageString = window.localStorage.getItem("users");
        const userInStorage = JSON.parse(userInStorageString);
        if (userInStorage) {
            setUsers(userInStorage);
        }
    }, []);

    const handleInputChange = (setState) => {
        return (event) => {
            setState(event.target.value);
        };
    };

    const handleLogin = () => {
        const foundUser = users.find(user => user.email === email && user.password === password);
        if (foundUser) {
            setIsLoggedIn(true);
        } else {
            alert("Correo electrónico o contraseña incorrectos");
        }
    };

    const handleRegister = () => {
        // Verificando si el usuario ya existe
        const userExists = users.some(user => user.email === email);
        if (userExists) {
            alert("El usuario ya está registrado");
            return;
        }
        const newUser = { email, password };
        const updatedUsers = [...users, newUser];
        setUsers(updatedUsers);
        window.localStorage.setItem("users", JSON.stringify(updatedUsers)); // Actualiza el localStorage
        alert("Usuario registrado correctamente");
        setEmail("");
        setPassword("");
    };

    return (
        <>
            {isLoggedIn ? (
                <Playlist/>
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
