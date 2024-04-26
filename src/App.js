import { Route, Routes } from 'react-router-dom';
import './App.css';
import LoginScreen from './component/LoginScreen';
import { DashBoard } from './component/Dashboard';

function App() {
  return (
    <Routes>
    <Route path='/' element={    <LoginScreen/>} />
    <Route path='/dashboard' element={<DashBoard/>} />
  </Routes>
  );
}

export default App;
