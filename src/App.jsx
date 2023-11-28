import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Registervehicle from './pages/Registervehicles';
import Addvehicle from './pages/Addvehicle';
import Login from './pages/Login';
import ViewParking from './pages/ViewParking';
import NoFoundPage from './pages/NoFoundPage';
import Menu from './components/Menu';
import { LoginProvider } from './context/LoginProvider';
import SearchVehicle from './pages/SearchVehicle';

function App() {

  return (
    <>
      <BrowserRouter>
        <LoginProvider>
          <Menu />
          <Routes>
            <Route path="/" element={
              <h3 className='container text-center'>Welcome, please log in to start using this app.</h3>
            } />
            <Route path='/SearchVehicle' element={<SearchVehicle />} />
            <Route path="/RegisterVehicle" element={<Registervehicle />} />
            <Route path="/Login" element={<Login />} />
            <Route path="/AddVehicle" element={<Addvehicle />} />
            <Route path="/ViewVehiclesParking" element={<ViewParking />} />
            <Route path="/NoFoundPage" element={<NoFoundPage />} />
          </Routes>
        </LoginProvider>
      </BrowserRouter>
    </>
  )
}

export default App
