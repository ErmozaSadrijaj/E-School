import {createBrowserRouter,Navigate} from 'react-router-dom'
import MesimdhenesiLayout from './modulesMesimdhenesi/MesimdhenesiLayout'
import Mesimdhenesi from './modulesMesimdhenesi/Mesimdhenesi';
import MesimdhenesiStudentet from './modulesMesimdhenesi/MesimdhenesiStudentet';
export const id = '1';
const router = createBrowserRouter([
    {
        path:'/',
        element:<MesimdhenesiLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/mesimdhenesi/id=${id}`} replace />
            },
            {
                path:`/mesimdhenesi/id=${id}`,
                element:<Mesimdhenesi/>
            },
            {
                path:`/mesimdhenesi/id=${id}/studentet`,
                element:<MesimdhenesiStudentet/>
            }
        ]
    }
])
export default router
