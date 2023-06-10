import {createBrowserRouter,Navigate} from 'react-router-dom'
import Nxenesi from './components/Nxenesi'
import Layout from './components/NxenesiLayout'
import Lendet from './components/Lendet'
import Mungesat from './components/Mungesat';
import Notat from './components/Notat';
import Veretjet from './components/Veretjet';
import Lenda from './components/Lenda'

localStorage.setItem('UserRole','nxenesi')
localStorage.setItem('userID','1')
export const userRole = localStorage.getItem('UserRole')
export const userID = localStorage.getItem('userID')

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