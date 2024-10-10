import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from './routes/error/ErrorPage.tsx';
import { LoginForm } from './routes/auth/login.tsx';
import { SignUpForm } from './routes/auth/register.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import LandingPage from './routes/landing-page/index.tsx';
import DefaultLayout from './components/default-layout.tsx';
import PublicView from './routes/PublicView.tsx';
import { ForgotPassword } from './routes/auth/forgot-password.tsx';

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
                element: <LoginForm />
              },
              {
                path: "/register",
                element: <SignUpForm />
              },
              {
                path: "/forgot-password",
                element: <ForgotPassword />

              }

            ]
          }
        ]
      },
      // {
      //   element: <ProtectedView />,
      //   children: [
      //     {
      //       children: [
      //         {
      //           element: <MainDashboardLayout />,
      //           children: [
      //             {
      //               path: "/dashboard",
      //               element: <Dashboard />
      //             },
      //             {
      //               path: '/setting',
      //               element: <Setting />,
      //             },
      //           ]
      //         }
      //       ]
      //     }
      //   ]
      // }
    ]
  }

]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </StrictMode>,
)
