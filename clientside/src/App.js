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
import NewVaccine from './features/vaccine/NewVaccine';
import EditDisease from './features/disease/EditDisease';
import NewDisease from './features/disease/NewDisease';
import Prefetch from './features/auth/PreFatch';
/*
  Summary:
  - This file defines the routing configuration for the application using React Router.
  - Routes are defined using the Routes and Route components from react-router-dom.
  - The application layout, public pages, login page, and dashboard layout are defined as routes.
  - Nested routes are used under the /dash route for managing clients, users, vaccines, and diseases.
  - Each Route component specifies the component to render based on the URL path.
*/

function App() {
  return (
    <Routes>
      
      <Route path="/" element = {<Layout/>}/>
      <Route index element={<Public/>} />
      <Route path = "login" element={<Login/>}/>
      <Route element={<Prefetch/>}>
        <Route path = "dash" element={<DashLayout />} >
          <Route index element={<Welcom />} />

          <Route path="clients">
            <Route index element={<ClientsList />} />
            <Route path=':id' element={<EditClient />} />
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
            <Route path='new' element={<NewVaccine />} />
          </Route>

          <Route path="diseases">
            <Route index element={<DiseaseList />} />
            <Route path=':id' element={<EditDisease />} />
            <Route path='new' element={<NewDisease />} />
          </Route> {/**end dash */}
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
