import {createBrowserRouter,Navigate} from 'react-router-dom'
import Nxenesi from './components/Nxenesi'
import Layout from './components/Layout'
import Lendet from './components/Lendet'
import Mungesat from './components/Mungesat';
import Notat from './components/Notat';
import Veretjet from './components/Veretjet';
export const id = 'N-123456789';
const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/nxenesi/id=${id}`} replace />
            },
            {
                path:`/nxenesi/id=${id}`,
                element:<Nxenesi/>
            },
            {
                path:`/nxenesi/id=${id}/lendet`,
                element:<Lendet/>
            },
            {
                path:`/nxenesi/id=${id}/mungesat`,
                element:<Mungesat/>
            },
            {
                path:`/nxenesi/id=${id}/notat`,
                element:<Notat/>
            },
            {
                path:`/nxenesi/id=${id}/veretjet`,
                element:<Veretjet/>
            }
        ]
    }
])
export default router
