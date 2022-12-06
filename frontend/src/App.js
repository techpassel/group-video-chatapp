import Auth from './screens/auth/Auth';
import Home from './screens/home/Home';
import { BrowserRouter as Router, Routes, Route, createBrowserRouter, RouterProvider } from 'react-router-dom';


// Syntax for Link
{/* <Link to="/">Home</Link> */ }

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Auth />,
    },
    {
      path: "/home",
      element: <Home />
    }
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;
