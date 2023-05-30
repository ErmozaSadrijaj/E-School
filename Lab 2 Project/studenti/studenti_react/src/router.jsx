import {createBrowserRouter,Navigate} from 'react-router-dom'
import Nxenesi from './components/Nxenesi'
import Layout from './components/NxenesiLayout'
import Lendet from './components/Lendet'
import Mungesat from './components/Mungesat';
import Notat from './components/Notat';
import Veretjet from './components/Veretjet';
import Lenda from './components/Lenda'
export const id = '1';
localStorage.setItem('UserRole','mesimdhenesi')
export const userRole = localStorage.getItem('UserRole')

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/${userRole}/id=${id}`} replace />
            },
            {
                path:`/${userRole}/id=${id}`,
                element:<Nxenesi/>
            },
            {
                path:`/${userRole}/id=${id}/lendet`,
                element:<Lendet/>
            },
            {
                path:`/${userRole}/id=${id}/mungesat`,
                element:<Mungesat/>
            },
            {
                path:`/${userRole}/id=${id}/notat`,
                element:<Notat/>
            },
            {
                path:`/${userRole}/id=${id}/veretjet`,
                element:<Veretjet/>
            },
            {
                path:`/${userRole}/id=${id}/lendet/:lendaID`,
                element: <Lenda />
            }
        ]
    }
])
export default router
