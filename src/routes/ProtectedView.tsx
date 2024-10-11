import { useAppState } from '@/state';
import { Outlet, useLocation, Navigate } from 'react-router';


function ProtectedView() {
    const {
        state: { user },
    } = useAppState();
    const { pathname: redirect, search: query } = useLocation();
    const url = (redirect + query)
    const correctedUrl = url.replace(/&amp;/g, '&');
    console.log("user", user, !user)

    if (!user)
        return (
            <Navigate
                to={`/login?redirect_back=${encodeURIComponent(correctedUrl)}`}
                replace
            />
        );
    return <Outlet />;
}

export default ProtectedView;
