import { Outlet, useNavigation } from 'react-router-dom';
import './App.css'
import { useAppState } from './state';
import { Loader2 } from 'lucide-react';
import { Toaster } from './components/ui/toaster';

function App() {
  const {
    state: { loading },
  } = useAppState();


  const navigation = useNavigation();

  const isRouteLoading = navigation.state === 'loading';

  if (loading || isRouteLoading) {
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }


  if (loading)
    return (
      <div className="h-[100vh] w-full flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
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
