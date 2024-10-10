import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/error/ErrorPage.tsx';
import { LoginPage } from './routes/auth/login.tsx';
import { RegisterPage } from './routes/auth/register.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import LandingPage from './routes/landing-page/index.tsx';
import PublicView from './routes/PublicView.tsx';
import { ForgotPassword } from './routes/auth/forgot-password.tsx';
import ProtectedView from './routes/ProtectedView.tsx';
import MainDashboardLayout from './components/layout/main-layout.tsx';
import MainDashboard from './routes/dashboard/index.tsx';
import DefaultLayout from './components/layout/default-layout.tsx';
import { TooltipProvider } from './components/ui/tooltip.tsx';
import Setting from './routes/setting/setting.tsx';
import About from './routes/about.tsx';

const router = createBrowserRouter([
  {
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <DefaultLayout />,
        children: [
          {
            element: <PublicView />,
            children: [
              {
                index: true,
                element: <LandingPage />
              },
              {
                path: '/login',
                element: <LoginPage />
              },
              {
                path: "/register",
                element: <RegisterPage />
              },
              {
                path: "/forgot-password",
                element: <ForgotPassword />
              }

            ]
          }
        ]
      },
      {
        element: <ProtectedView />,
        children: [
          {
            children: [
              {
                element: <MainDashboardLayout />,
                children: [
                  {
                    path: "/dashboard",
                    element: <MainDashboard />
                  },
                  {
                    path: '/setting',
                    element: <Setting />,
                  },
                  {
                    path: "/about",
                    element: <About />
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <TooltipProvider>
        <RouterProvider router={router} />
      </TooltipProvider>
    </ThemeProvider>
  </StrictMode>,
)
