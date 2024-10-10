import { Outlet } from 'react-router-dom';
import './App.css'
import { useAppState } from './state';
import { Loader } from 'lucide-react';
import { Toaster } from './components/ui/toaster';

function App() {
  const {
    state: { loading },
  } = useAppState();

  if (loading)
    return (
      <div className="h-[100vh] w-full">
        <Loader />
      </div>

    );
  return (
    <>
      <Outlet />
      <Toaster />
    </>
  );
}

export default App
