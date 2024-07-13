
import Dashboard from './components/dashboard';
import HorizontalNavbar from './components/horizonNavbar';
import VerticalNavbar from './components/verticalNavbar';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home';
import "./assets/global.scss";

function App() {
  const location = useLocation();
  return (
    <div className="main">
      {location.pathname.startsWith('/dashboard') && <HorizontalNavbar />}
      <div className='main-core'>
        {location.pathname.startsWith('/dashboard') && <VerticalNavbar />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard/:userId" element={<Dashboard />} />
        </Routes>
      </div>
    </div>
  );
}
//AppWrapper encapsule App dans un Router pour que le hook useLocation fonctionne correctement à l'intérieur de App
function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper
