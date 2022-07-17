import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './Navigation';
import About from './About';
import Home from './Home';
import Register from './Register';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import axios from "axios"
import { useEffect } from 'react';




const App = () => {

  const message = "-->Connection Established With React<--"

  useEffect( () => {

    const conn = async() => {
    try {
			  await axios.post("/start", {
				message
			})
      .then((responce) => console.log(responce.data))
		} catch (error) {
			console.error(error)
		}}
    conn()
  },[]);



  return (
    <Router>
    <Navigation> </Navigation>
        <Routes>
                <Route path='/Home' element={<Home/>} />
                <Route path='/About' element={<About/>} />
                <Route path='/Register' element={<Register/>} />
                <Route path='/' element={<Home/>} />
        </Routes>
    </Router>
    
  );
}

export default App;
