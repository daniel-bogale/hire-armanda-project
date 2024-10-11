import { useSearchParams, Outlet, Navigate } from 'react-router-dom';
import { useAppState } from '../state';

function PublicView() {
    const {
        state: { user },
    } = useAppState();

    const storedUser = localStorage.getItem('user');
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    const currentUser = user || parsedUser;

    const [searchParams] = useSearchParams();
    const redirectBack = searchParams.get('redirect_back');
    const correctedUrl = redirectBack
        ? decodeURIComponent(redirectBack).replace(/&amp;/g, '&')
        : '/dashboard';

    if (currentUser) {
        return <Navigate to={correctedUrl} replace />;
    }

    return <Outlet />;
}

export default PublicView;
