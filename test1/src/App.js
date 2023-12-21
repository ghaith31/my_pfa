import logo from './logo.svg';
import './App.css';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import { BrowserRouter , Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
    <BrowserRouter >
    <Routes>
    <Route path = "/" element = {<Home/>} />
    <Route path = "/SignIn" element = {<SignIn/>} />
    
    </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
