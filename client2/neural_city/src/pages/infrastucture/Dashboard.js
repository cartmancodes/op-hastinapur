import Sidebar from '../../Components/Global/Sidebar'
import { Outlet } from 'react-router';
import DashBoardNav from '../../Components/Global/DashBoardNav';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Traffic } from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import { ToastContainer } from 'react-toastify';

let navitems = [
    {
        name: "Monitoring",
        path_link: "/infra/monitoring",
        curr_path: "monitoring"
    },
    {
        name: "Cleaniness Dashboard",
        path_link: "/infra/parameter",
        curr_path: "parameter"
    },
    {
        name: "Map View",
        path_link: "/infra/featuredrill",
        curr_path: "featuredrill"
    },
    {
        name: "Areawise Breakdown",
        path_link: "/infra/area",
        curr_path: "area"
    },

    {
        name: "Intiate Action",
        path_link: "/infra/intiateaction",
        curr_path: "intiateaction"
    },
    {
        name: "Planning",
        path_link: `/infra/planning`,
        curr_path: "planning"
    },
]
function Dashboard() {
    return (
        <div className='bg-purple-50 font-sans bg-opacity-25 w-full'>
            <DashBoardNav items={navitems} include_date={true} />
            <div className='min-h-[100vh] px-[20px] py-[20px] rounded-lg w-full flex relative'>
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