// import { useState } from 'react'
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import ngrok from 'ngrok';

import Register from '@/pages/register/Register';
import MapPage from '@/pages/MapPage/MapPage';
import { Layout, RequireAuth } from './pages/layout/Layout';
import Login from './pages/login/Login';
import { ThemeProvider } from './components/theme-provider';
import ProjectInfoCard from './components/component/projectInfoCard';
import Profile from './pages/profile/Profile';
import ScrollToTopButton from './components/component/scrollToTopButton';
import { ConstructionInfoLandingComponent } from './components/construction-info-landing';
// import Navbar from './components/navbar/Navbar';
// console.log(Navbar)
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true, // Index route for the default child
        element: <ConstructionInfoLandingComponent />, // The landing page to be shown by default
      },
      {
        path: '/register',
        element: <Register />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/map',
        element: <MapPage />,
      },
    ],
  },
  {
    path: '/',
    element: <RequireAuth />,
    children: [
      {
        path: '/home',
        element: <MapPage />,
      },
      {
        path: '/profile/:id',
        element: <Profile />,
      },
      // {
      //   path: '/profile',
      //   element: <Profile />,
      // },
      // {
      //   path: '/profile/:id/add-project',
      //   element: <AddPRojectCard />,
      // },
      {
        path: '/projects/:id/',
        element: <ProjectInfoCard />,
        children: [
          {
            path: '/projects/:id/update',
            element: <ProjectInfoCard />,
          },
        ],
      },
    ],
  },
]);

function App() {
  // const [count, setCount] = useState(0)

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <div className="overflow-hidden  	">
        <ScrollToTopButton />
        <RouterProvider router={router} />
      </div>
    </ThemeProvider>
  );
}

export default App;
