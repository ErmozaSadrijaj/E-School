import {createBrowserRouter,Navigate} from 'react-router-dom'
import MesimdhenesiLayout from './modulesMesimdhenesi/MesimdhenesiLayout'
import Mesimdhenesi from './modulesMesimdhenesi/Mesimdhenesi';
import MesimdhenesiStudentet from './modulesMesimdhenesi/MesimdhenesiStudentet';
import AdministratoriLendet from './modulesAdministratori.js/AdministratoriLendet';
import AdministratoriMesimdhenesit from './modulesAdministratori.js/AdministratoriMesimdhenesit';
import AdministratoriStudentet from './modulesAdministratori.js/AdministratoriStudentet';
import DetajetStudentit from './modulesAdministratori.js/DetajetStudentit';


export const id = '4';
localStorage.setItem('UserRole','administratori')
export const userRole = localStorage.getItem('UserRole')

const router = createBrowserRouter([
    {
        path:'/',
        element:<MesimdhenesiLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/${userRole}/id=${id}`} replace />
            },
            {
                path:`/${userRole}/id=${id}`,
                element:<Mesimdhenesi/>
            },
            {
                path:`/${userRole}/id=${id}/studentet`,
                element:<MesimdhenesiStudentet/>
            },
            {
                path:`/${userRole}/id=${id}/administrator_studentet`,
                element:<AdministratoriStudentet/>
            },
            {
                path:`/${userRole}/id=${id}/lendet`,
                element:<AdministratoriLendet/>
            },
            {
                path:`/${userRole}/id=${id}/mesimdhenesit`,
                element:<AdministratoriMesimdhenesit/>
            },
            {
                path:`/${userRole}/id=${id}/administrator_studentet/:studentiID`,
                element:<DetajetStudentit/>
            }
        ]
    }
])
export default router
