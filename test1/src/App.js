//import logo from './logo.svg'; (we will fixed 2days ago friday PLD)
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/pages/Home/Home';
import SignIn from './Components/pages/SignIn/SignIn';
import SinUp from './Components/pages/SignUp/SignUp';
import About from './Components/pages/About/About';
import logo from './logo.svg';
import Profile from './Components/pages/Profile/Profile';
import Header from './Components/Header/Header';

function App() {
  return (
    <div>
    <BrowserRouter >
    <Header/>
    <Routes>
    <Route path = "/" element = {<Home/>} />
    <Route path = "/SignIn" element = {<SignIn/>} />
    <Route path = "/SinUp" element = {<SinUp/>} />
    <Route path = "/about" element = {<About/>} />
    <Route path = "/Profile" element = {<Profile/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}
export default App;
