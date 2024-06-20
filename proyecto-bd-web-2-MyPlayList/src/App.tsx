import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CountButton from './components/CountButton';
import { Routes, Route } from 'react-router-dom'
import Inicio from './pages/Inicio';
import Contacto from './pages/Contacto';
import Form from './components/Form/Form';
import Theater from './components/Theater';
//import MenuPrincipal from './pages/MenuPrincipal'

const isLogged = () => {
  return true;
}

function App() {
  return (
    <main>
        <Routes>
          <Route path='/' element={<Inicio/>}/>
          <Route path='/contacto' element={<Contacto/>}/>
          <Route path='/form' element={<Form/>}/>
          <Route path='/theater' element={<Form/>}/>
          {
            isLogged() && <Route path='form' element={<Form/>}/>
          }
        </Routes>
    </main>
  )
}

export default App