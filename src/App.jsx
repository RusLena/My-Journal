import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar/Navbar";
import Wrapper from './components/Wrapper/Wrapper';
import Journal from './pages/Journal';
import Exercise from './pages/Exercise';
import Food from './pages/Food';
import Tasks from './pages/Tasks';
import List from './pages/List';
import PageNotFound from './pages/PageNotFound';
import Footer from './components/Footer/Footer';

import './App.css';  

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Wrapper>
          <Routes>
            {/* Journal page as the homepage */}
            <Route path="/" element={<Journal />} />
            
            {/* Other pages */}
            <Route path="/exercise" element={<Exercise />} />
            <Route path="/food" element={<Food />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/list" element={<List />} />
            {/* Page Not Found route */}
            <Route path="*" element={<PageNotFound />} /> 
          </Routes>
        </Wrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
