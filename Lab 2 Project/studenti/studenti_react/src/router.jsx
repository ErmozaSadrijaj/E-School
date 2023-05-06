import {createBrowserRouter,Navigate} from 'react-router-dom'
import Nxenesi from './components/Nxenesi'
import Layout from './components/Layout'
import Lendet from './components/Lendet'
const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout/>,
        children:[
            {
                path:'/',
                element:<Navigate to="/nxenesi" replace />
            },
            {
                path:'/nxenesi',
                element:<Nxenesi/>
            },
            {
                path:'/lendet',
                element:<Lendet/>
            }
        ]
    }
])
export default router