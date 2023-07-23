import './style.scss'
import './App.css';
import Leftbar from './components/leftbar/Leftbar';
import Navbar from './components/navbar/navbar';
import Rightbar from './components/rightbar/rightbar';
import Home from './pages/home/Home';

import Login from './pages/login/login';
import Profile from './pages/profile/profile';
import Register from './pages/register/register';
import { createBrowserRouter, RouterProvider, Route, Outlet, Navigate } from "react-router-dom"
import { useContext } from 'react';
import { DarkModeContext } from './context/darkModeContext';
import { AuthContext } from './context/authcontext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';


function App() {


  //for protect route from client side
  //const currentUser = false;

  //for creting true but after willl be false
  //const currentUser = true;

  const { currentUser } = useContext(AuthContext)


  const { darkMode } = useContext(DarkModeContext)
  console.log("darkmode", darkMode)

  //create instence of queryclient
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <>
        <QueryClientProvider client={queryClient}>
          <div className={`theme-${darkMode ? "dark" : "light"}`}>
            <Navbar />
            <div style={{ display: "flex" }}>
              <Leftbar />
              <div style={{ flex: "6" }}>
                <Outlet />
              </div>

              <Rightbar />

            </div>
          </div>
        </QueryClientProvider>

      </>
    )
  }

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectedRoute> <Layout /></ProtectedRoute>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]

    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />
    },


  ])
  return (
    <div>
      <RouterProvider router={router} />

    </div>
  );
}

export default App;
