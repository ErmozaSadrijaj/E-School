import {createBrowserRouter,Navigate} from 'react-router-dom'
import Nxenesi from './components/Nxenesi'
import Layout from './components/NxenesiLayout'
import Lendet from './components/Lendet'
import Mungesat from './components/Mungesat';
import Notat from './components/Notat';
import Veretjet from './components/Veretjet';
import Lenda from './components/Lenda'

const url = document.URL
const path = new URL(url).pathname;
const content = path.substring(1);
export const userRole = content.split('/')[0];
export const userID = content.split('/')[1];


const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/:userRole/:userID`} replace />
            },
            {
                path:`/:userRole/:userID`,
                element:<Nxenesi/>
            },
            {
                path:`/:userRole/:userID/lendet`,
                element:<Lendet/>
            },
            {
                path:`/:userRole/:userID/mungesat`,
                element:<Mungesat/>
            },
            {
                path:`/:userRole/:userID/notat`,
                element:<Notat/>
            },
            {
                path:`/:userRole/:userID/veretjet`,
                element:<Veretjet/>
            },
            {
                path:`/:userRole/:userID/lendet/:lendaID`,
                element: <Lenda />
            }
        ]
    }
])
export default router