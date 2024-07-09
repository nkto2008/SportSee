
import Dashboard from './components/dashboard';
import HorizontalNavbar from './components/horizonNavbar';
import VerticalNavbar from './components/verticalNavbar';
import { Routes, Route } from 'react-router-dom';
import "./assets/global.scss";

function App() {
  return (
    <div className="main ">
      <HorizontalNavbar/>
      <div className='main-core'>
        <VerticalNavbar/>
        <Dashboard/>
      </div>
    </div>
  );
}

export default App
