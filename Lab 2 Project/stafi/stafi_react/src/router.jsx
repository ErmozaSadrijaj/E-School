import {createBrowserRouter,Navigate} from 'react-router-dom'
import MesimdhenesiLayout from './modulesMesimdhenesi/MesimdhenesiLayout'
import Mesimdhenesi from './modulesMesimdhenesi/Mesimdhenesi';
import MesimdhenesiStudentet from './modulesMesimdhenesi/MesimdhenesiStudentet';
import AdministratoriLendet from './modulesAdministratori.js/AdministratoriLendet';
import AdministratoriMesimdhenesit from './modulesAdministratori.js/AdministratoriMesimdhenesit';
import AdministratoriStudentet from './modulesAdministratori.js/AdministratoriStudentet';
import DetajetStudentit from './modulesAdministratori.js/DetajetStudentit';
import Administratori from './modulesDrejtori/Administratoret';
import Blogjet from './modulesAdministratori.js/Blogjet';

const url = document.URL
const path = new URL(url).pathname;
const content = path.substring(1);
export const userRole = content.split('/')[0];
export const userID = content.split('/')[1];

const router = createBrowserRouter([
    {
        path:'/',
        element:<MesimdhenesiLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/${userRole}/:${userID}`} replace />
            },
            {
                path:`/${userRole}/:${userID}`,
                element:<Mesimdhenesi/>
            },
            {
                path:`/${userRole}/:${userID}/studentet`,
                element:<MesimdhenesiStudentet/>
            },
            {
                path:`/${userRole}/:${userID}/administrator_studentet`,
                element:<AdministratoriStudentet/>
            },
            {
                path:`/${userRole}/:${userID}/lendet`,
                element:<AdministratoriLendet/>
            },
            {
                path:`/${userRole}/:${userID}/mesimdhenesit`,
                element:<AdministratoriMesimdhenesit/>
            },
            {
                path:`/${userRole}/:${userID}/administrator_studentet/:studentiID`,
                element:<DetajetStudentit/>
            },
            {
                path:`/${userRole}/:${userID}/administratoret`,
                element:<Administratori/>
            }
            ,
            {
                path:`/${userRole}/:${userID}/menaxhoBlogjet`,
                element:<Blogjet/>
            }
        ]
    }
])
export default router
