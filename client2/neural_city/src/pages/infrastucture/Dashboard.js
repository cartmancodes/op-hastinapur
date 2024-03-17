import Sidebar from '../../Components/Global/Sidebar'
import { Outlet } from 'react-router';
import DashBoardNav from '../../Components/Global/DashBoardNav';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Traffic } from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import InsightsIcon from '@mui/icons-material/Insights';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';

let navitems = [
    {
        name: "Monitoring",
        path_link: "/infra/monitering",
        curr_path: "monitering"
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
        path_link: "/infra/monitering",
        curr_path: null
    },
    {
        icon: <ManageSearchIcon />,
        title: "Feature Drill",
        path_link: "/infra/monitering/sustainability",
        curr_path: "sustainability"
    }
]
function Dashboard() {
    return (
        <div className='bg-purple-50 font-sans bg-opacity-25 w-full space-y-2'>
            <DashBoardNav items={navitems} include_date={true}/>
            <div className='min-h-[100vh] rounded-lg w-full flex relative'>
                <Sidebar items={sidebaritems}></Sidebar>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard