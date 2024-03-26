import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Public from './components/Public';
import Login from './features/auth/Login';
import DashLayout from './dash/DashLayout';
import Welcom from './features/auth/Welcome';
import UsersList from './features/users/UsersList';
import ClientsList from './features/clients/ClientsList';
import VaccineList from './features/vaccine/VaccinesList';
import DiseaseList from './features/disease/DiseasesList';

function App() {
  return (
    <Routes>
      
      <Route path="/" element = {<Layout/>}/>
      <Route index element={<Public/>} />
      <Route path = "login" element={<Login/>}/>
      <Route path = "dash" element={<DashLayout />} >
        <Route index element={<Welcom />} />
        <Route path="clients">
          <Route index element={<ClientsList />} />
        </Route>
        <Route path="users">
          <Route index element={<UsersList />} />
        </Route>
        <Route path="vaccines">
          <Route index element={<VaccineList />} />
        </Route>
        <Route path="diseases">
          <Route index element={<DiseaseList />} />
        </Route>

      </Route>
    </Routes>
  );
}

export default App;
