import {
    useSearchParams,
    Outlet,
    Navigate,
} from 'react-router-dom';
import { useAppState } from '../state';

function PublicView() {
    const {
        state: { user },
    } = useAppState();

    const [searchParams] = useSearchParams();

    const redirectBack = searchParams.get('redirect_back');
    const correctedUrl = redirectBack
        ? decodeURIComponent(redirectBack).replace(/&amp;/g, '&')
        : '/dashboard';

    if (user) return <Navigate to={correctedUrl} replace />;

    return <Outlet />;
}

export default PublicView;
