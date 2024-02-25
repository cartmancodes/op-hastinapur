import Sidebar from '../../Components/Utility/Sidebar'
import Footer from '../../Components/Utility/Footer';
import { Outlet } from 'react-router';
import DashBoardNav from '../../Components/DashBoardNav';
import { useEffect } from 'react';
function Dashboard() {
    return (
        <div className=' bg-rose-50 bg-opacity-25 w-full space-y-2'>
            <DashBoardNav />
            <div className='rounded-lg w-full flex relative'>
                <Sidebar></Sidebar>
                <Outlet />
            </div>
            <Footer />
        </div>
    )
}

export default Dashboard