import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Placeholder from './components/PlaceHolder';
import Home from './components/Home';
import ClientSection from './components/ClientSection';
import Register from './components/Register';
import Login from './components/Login';
import ClientLogged from './components/ClientLogged';


function App() {
  return (
    <Router>
      <div className = "container">
        <Routes>
          <Route path="/placeholder" element={<Placeholder/>} />  
          <Route path="/" element={<Home/>} />
          <Route path="/client" element={<ClientSection/>} />
          <Route path="/client/register" element={<Register/>} />
          <Route path="/client/login" element={<Login/>} />
          <Route path="/client/logged" element= {<ClientLogged/>} />


        </Routes>
      </div>
    </Router>
  );
}

export default App
