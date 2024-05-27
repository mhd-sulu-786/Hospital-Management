import './App.css';
import Login from './Forms/Login';
import Register from './Forms/Register';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Home/Navbar';
import Footer from './Home/Footer';
import { useState } from 'react';
import Home from './Home/Home';
import Employes from './Pages/Employes';
import Department from './Pages/Department';
import DepartmentHead from './Pages/DepartmentHead';
import EmployeeForm from './Forms/MainForms/Employfrom';
import DepartmentForm from './Forms/MainForms/Departmentfrom';
import DepartmentHeadForm from './Forms/MainForms/Departmentheadfrom';
import EmployEdith from './Pages/Ediths/EmployEdith';
import DepartmentEdith from './Pages/Ediths/DepartmentEdith';
import DepartmentHeadEdith from './Pages/Ediths/DpHeadEdith';
import PrivateRoute from './Home/PrivateRoute';
import { AuthProvider } from './Context/AuthContext';
import SingleCard from './Pages/SingleCards/SingleCard';
import Singledepartment from './Pages/SingleCards/SingleDepatment';
import SingledpHead from './Pages/SingleCards/SingledpHead';

function App() {
  const [active, setActive] = useState('Home');
  const rendersection = () => {
    switch (active) {
      case 'Home':
        return <Home />;
      case 'Employes':
        return <Employes setActive={setActive}/>;
      case 'Department':
        return <Department setActive={setActive} />;
      case 'DepartmentHead':
        return <DepartmentHead setActive={setActive} />;
      case 'addEmploy':
        return <EmployeeForm setActive={setActive} />;
      case 'addDepartment':
        return <DepartmentForm setActive={setActive} />;
      case 'addDepartmentHead':
        return <DepartmentHeadForm setActive={setActive}/>;
      case 'login':
        return <Login/>;        
      default:
        break;
    }
  }

  return (
    <AuthProvider>
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path='/' element={<PrivateRoute element={
              <>
                <Navbar setActive={setActive} />
                {rendersection()}
                <Footer setActive={setActive} />
              </>
            }/>} />
            <Route path='/EdithEmploy/:id'  element={<EmployEdith/>}/>
            <Route path='/EdithDepartment/:id'  element={<DepartmentEdith/>}/>
            <Route path='/EdithDepartmentHead/:id'  element={<DepartmentHeadEdith />} />
            <Route path='/SingleEmploy/:id'  element={<SingleCard />}/>
            <Route path='/SingleDepartment/:id'  element={<Singledepartment />}/>
            <Route path='/SingledpHead/:id'  element={<SingledpHead/>}/>
          </Routes>
        </BrowserRouter>
      </div>
    </AuthProvider>
  );
}

export default App;
