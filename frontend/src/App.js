import Auth from './screens/auth/Auth';
import Home from './screens/home/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// Syntax for Link
{/* <Link to="/">Home</Link> */ }

function App() {
  return (
    <Router>
      <Routes>
        <Route path='' element={<Auth />} />
        <Route path='/home' element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
