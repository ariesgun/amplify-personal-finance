import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Contact from './pages/contact';
import Dashboard from './pages/dashboard';
import Records from './pages/records';
import SyncBank from './pages/syncBank';
import SyncBankFinish from './pages/syncBankFinish';
import Profile from './pages/profile';

function SiteRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sync-bank" element={<SyncBank />} />
        <Route path="/sync-bank-finish" element={<SyncBankFinish />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/records" element={<Records />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}


function App() {
  return (
    <SiteRoutes />
  );
}

export default App;
