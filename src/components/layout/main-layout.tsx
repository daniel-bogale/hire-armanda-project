import { Outlet } from 'react-router-dom'
import Footer from '../footer'
import MainHeader from '../header/main-header'

type Props = {}

const MainDashboardLayout = ({ }: Props) => {
    return (
        <div className="relative">
            <div className="min-h-[92vh] pl-14 md:pl-0">
                <MainHeader />
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default MainDashboardLayout