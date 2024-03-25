import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './dash/DashLayout';
import Welcom from './features/auth/Welcome';

function App() {
  return (
    <Routes>
      
      <Route path="/" element = {<Layout/>}/>
      <Route index element={<Public/>} />
      <Route path = "login" element={<Login/>}/>
      <Route path = "dash" element={<DashLayout />} >
        <Route index element={<Welcom />} />
      </Route>
    </Routes>
  );
}

export default App;
