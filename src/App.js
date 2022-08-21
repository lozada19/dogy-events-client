
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';
import Profile from './pages/profile/Profile';
import DogList from './pages/dog/DogList'
import DogDetails from './pages/dog/DogDetails'
import DogEdit from './pages/dog/DogEdit'
import EventList from './pages/event/EventList'
import EventDetails from './pages/event/EvenDetails'
import EveentEdit from './pages/event/EventEdit'
import Home from './pages/Home'
import AddFormDog from './pages/dog/AddFormDog';
import AddFormEvent from './pages/event/AddFormEvent';
import MydDog from './pages/dog/MydDog';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/dog" element={<DogList/>}/>
        <Route path="/dog/myDog" element={<MydDog/>}/>
        <Route path="/dog/add-form" element={<AddFormDog/>}/>
        <Route path="/dog/:dogId/details" element={<DogDetails/>}/>
        <Route path="/dog/:dogId/edit" element={<DogEdit/>}/>
        <Route path="/event" element={<EventList/>}/>
        <Route path="/dog/add-form" element={<AddFormEvent/>}/>
        <Route path="/event/:eventId/details" element={<EventDetails/>}/>
        <Route path="/event/:eventId/edit" element={<EveentEdit/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
