import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginScreen from './component/LoginScreen';
import { DashBoard } from './component/Dashboard';
import { Group } from './component/Group';
import { Other } from './component/Other';

function App() {
  return (
    <Routes>
    <Route path='/' element={    <LoginScreen/>} />
    <Route path='/dashboard' element={<DashBoard/>} />
    <Route path='/group' element={<Group/>} />
    <Route path='/others/:abc' element={<Other/>} />
  </Routes>
  );
}

export default App;
