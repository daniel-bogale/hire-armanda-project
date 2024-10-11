import { setUser, useAppState } from '@/state';
import { useEffect } from 'react';
import { Outlet, useLocation, Navigate } from 'react-router-dom';

function ProtectedView() {
    const {
        dispatch
    } = useAppState();

    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const currentUser = parsedUser;

    const { pathname: redirect, search: query } = useLocation();
    const url = `${redirect}${query}`;
    const correctedUrl = url.replace(/&amp;/g, '&');

    if (!currentUser) {
        return (
            <Navigate
                to={`/login?redirect_back=${encodeURIComponent(correctedUrl)}`}
                replace
            />
        );
    }

    useEffect(() => {
        dispatch(setUser(currentUser))
    }, [])

    return <Outlet />;
}

export default ProtectedView;
