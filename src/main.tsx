import { createRoot } from 'react-dom/client'
import './index.css'
import awsExports from "./aws-exports.js";
import { Amplify } from 'aws-amplify';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import Orders from './pages/Orders.tsx';
import MainLayout from './layouts/MainLayout.tsx';
Amplify.configure(awsExports);

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "orders",
        element: <Orders />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
