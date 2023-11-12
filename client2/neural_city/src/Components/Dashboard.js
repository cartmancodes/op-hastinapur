import Navbar from './Utility/Navbar'
import Sidebar from './Utility/Sidebar'
import Footer from './Utility/Footer';
import { Outlet } from 'react-router';
import RightSideBar from './Utility/RightSideBar';
import { useLocation } from 'react-router';
function Dashboard() {
    let location = useLocation();
    const { pathname } = location;
    return (
        <div className='flex'>
            <Sidebar></Sidebar>
            <div className='w-[80%] sm:w-[95%] ml-2 space-y-4'>
                <Navbar />
                <Outlet />
                <Footer />
            </div>
        </div>
    )
}

export default Dashboard