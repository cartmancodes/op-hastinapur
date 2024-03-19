import Sidebar from '../../Components/Global/Sidebar'
import { Outlet } from 'react-router';
import DashBoardNav from '../../Components/Global/DashBoardNav';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Traffic } from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import {ToastContainer} from 'react-toastify';

let navitems = [
    {
        name: "Monitoring",
        path_link: "/infra/monitoring",
        curr_path: "monitoring"
    },
    {
        name: "Intiate Action",
        path_link: "/infra/intiateaction",
        curr_path: "intiateaction"
    },
    {
        name: "Planning",
        path_link: `/infra/planning?id=${0}`,
        curr_path: "planning"
    }
]

let sidebaritems = [
    {
        icon: <InsightsIcon></InsightsIcon>,
        title: "Home",
        path_link: "/infra/monitoring",
        curr_path: null
    },
    {
        icon: <ManageSearchIcon />,
        title: "Feature Drill",
        path_link: "/infra/monitoring/featuredrill",
        curr_path: "featuredrill"
    }
]
function Dashboard() {
    return (
        <div className='bg-purple-50 font-sans bg-opacity-25 w-full space-y-2'>
            <DashBoardNav items={navitems} include_date={true} />
            <div className='min-h-[100vh] rounded-lg w-full flex relative'>
                <Sidebar items={sidebaritems}></Sidebar>
                <Outlet />
            </div>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />
        </div>
    )
}

export default Dashboard