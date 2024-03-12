import Sidebar from '../../Components/Utility/Sidebar'
import { Outlet } from 'react-router';
import DashBoardNav from '../../Components/DashBoardNav';
import HomeIcon from '@mui/icons-material/Home';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { Traffic } from '@mui/icons-material';
import LocationCityIcon from '@mui/icons-material/LocationCity';

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
        icon: <HomeIcon></HomeIcon>,
        title: "Home",
        path_link: "/infra/monitering",
        curr_path: null
    },
    {
        icon: <ApartmentIcon />,
        title: "Feature Drill",
        path_link: "/infra/monitering/sustainability",
        curr_path: "sustainability"
    },
    {
        icon: <Traffic />,
        title: "Traffic",
        path_link: "/infra/monitering/traffic",
        curr_path: "traffic"
    },
]
function Dashboard() {
    return (
        <div className='bg-rose-50 bg-opacity-25 w-full space-y-2'>
            <DashBoardNav items={navitems} include_date={true}/>
            <div className='rounded-lg w-full flex relative'>
                <Sidebar items={sidebaritems}></Sidebar>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard