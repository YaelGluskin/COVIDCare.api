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
import EditUser from './features/users/EditUser';
import NewUser from './features/users/NewUser';
import EditClient from './features/clients/EditClient';
import NewClient from './features/clients/NewClient';
import EditVaccine from './features/vaccine/EditVaccine';
import NewVaccineForm from './features/vaccine/NewVaccineForm';
import EditDisease from './features/disease/EditDisease';
import NewDisease from './features/disease/NewDisease';
import ClientData from './features/clients/ClientData'
import Prefetch from './features/auth/PreFatch';
import NewVaccine from './features/vaccine/NewVaccine';
import NewDiseaseForm from './features/disease/NewDiseaseForm';


function App() {
  return (
    <Routes>
      
      <Route path="/" element = {<Layout/>}/>
      <Route index element={<Public/>} />
      <Route path = "login" element={<Login/>}/>
      <Route element={<Prefetch/>}>

        <Route path = "dash" element={<DashLayout />} >
          <Route index element={<Welcom />} />
          {/* <Route path="LastMonthDiary" element={<LastMonthDiary/> } >
          </Route> */}

          <Route path="clients">
            <Route index element={<ClientsList />} />
            <Route path=':id/' element={<ClientData />} />
            <Route path=':id/edit' element={<EditClient />} />
            <Route path=':id/newDis' element={<NewDiseaseForm />} />
            <Route path=':id/newVac' element={<NewVaccineForm />} />

            <Route path='new' element={<NewClient />} />
          </Route>

          <Route path="users">
            <Route index element={<UsersList />} />
            <Route path=':id' element={<EditUser />} />
            <Route path='new' element={<NewUser />} />
            
          </Route>

          <Route path="vaccines">
            <Route index element={<VaccineList />} />
            <Route path=':id' element={<EditVaccine />} />
          </Route>

          <Route path="diseases">
            <Route index element={<DiseaseList />} />
            <Route path=':id' element={<EditDisease />} />
            
          </Route> {/**end dash */}
        </Route> {/**end outer */}
      </Route>
    </Routes>
  );
}

export default App;
