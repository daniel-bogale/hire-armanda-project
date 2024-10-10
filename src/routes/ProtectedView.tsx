import { useLocation } from 'react-router-dom';
import { Navigate, Outlet } from 'react-router';
import { useAppState } from '@/state';

function ProtectedView() {
    const {
        state: { user },
    } = useAppState();
    const { pathname: redirect, search: query } = useLocation();
    const url = (redirect + query)
    const correctedUrl = url.replace(/&amp;/g, '&');

    if (!user)
        return (
            <Navigate
                to={`/auth/login?redirect_back=${encodeURIComponent(correctedUrl)}`}
                replace
            />
        );
    return <Outlet />;
}

export default ProtectedView;
