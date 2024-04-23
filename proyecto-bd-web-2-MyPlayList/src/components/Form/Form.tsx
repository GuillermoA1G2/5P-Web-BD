import {useState, useEffect} from "react";
import "./Form.css";
import Data from "./Data";

const loginData = {
    email: 'a22110067@ceti.mx',
    password: '22110067'
}

function Form () {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [showData, setShowData] = useState<boolean> (false);

    useEffect (() => {
        
    }, [name, email]);

    //Curried function
    const handleInputChange = (stateUpdate) => {
        return (event) => {
            stateUpdate (event.target.value);
        }
    }

    const handleOnClick = () => {
        if(showData) {
            setName("");
            setEmail("");
        } else {
            //toggle the flag
            setShowData (!showData);
        }
    }

    return(
        <>
        <Data name={name} email={email} showData={showData} />
        <section className= "formContainer">
            <span className="inputContainer">
                <label htmlFor="name" >Nombre:</label>
                <input  type="text" id="name" name="name" value={name} 
                    onChange={handleInputChange(setName)}/>
            </span>
            <span className="inputContainer">
                <label htmlFor= "email">Email:</label>
                <input type= "email" id = "email" name="email" value={email} onChange={handleInputChange(setEmail)}/>
            </span>
            <button onClick={handleOnClick}>
                {
                    showData ? "Ocultar datos" : "Mostrar datos"
                }
            </button>
        </section>
        </>
    );
}

export default Form;