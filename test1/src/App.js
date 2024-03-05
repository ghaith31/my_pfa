//import logo from './logo.svg'; (we will fixed 2days ago friday PLD)
import { BrowserRouter , Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './Components/pages/Home/Home';
import SignIn from './Components/pages/SignIn/SignIn';
import SignUp from './Components/pages/SignUp/SignUp';
import About from './Components/pages/About/About';
import Profile from './Components/pages/Profile/Profile';
import Header from './Components/Header/Header';
import PrivateRoute from './Components/PrivateRoute';
import CreateListing from './Components/pages/CreateListing/CreateListing';
import Dashboard from './Components/pages/Dashboard/ShowListings';
import ShowListings from './Components/pages/Dashboard/ShowListings';
function App() {
  return (
    
    <BrowserRouter >
    <Header/>
    <Routes>
    <Route path = "/" element = {<Home/>} />
    <Route path = '/SignIn' element = {<SignIn/>} />
    <Route path = "/SignUp" element = {<SignUp/>} />
    <Route path = '/about' element = {<About/>} />
    <Route element = {<PrivateRoute />}>
        <Route path = "/Profile" element = {<Profile/>} />
        <Route path='/create-listing' element={<CreateListing />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path = '/ShowListings' element = {<ShowListings/>} />
    </Route>
    
    </Routes>
    </BrowserRouter>
    
  );
}
export default App;
