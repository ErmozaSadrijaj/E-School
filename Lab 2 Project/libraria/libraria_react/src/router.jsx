import {createBrowserRouter,Navigate} from 'react-router-dom'
import Libraria from './components/Libraria'
import Layout from './components/Layout'

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
                element:<Navigate to={`/:userRole/:userID/librat`} replace />
            },
            {
                path:`/:userRole/:userID/librat`,
                element:<Libraria/>
            }
        ]
    }
])
export default router