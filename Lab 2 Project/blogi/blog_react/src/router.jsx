import {createBrowserRouter,Navigate} from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Blogs from './components/Blogs';
import View_Blog from './components/View_Blog';

const url = document.URL
const path = new URL(url).pathname;
const content = path.substring(1);
export let userRole = content.split('/')[0];
export const userID = content.split('/')[1];


const router = createBrowserRouter([
    {
        path:'/',
        element:<BlogLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/${userRole}/${userID}/blogs`} replace />
            },
            {
                path:`/${userRole}/${userID}/blogs`,
                element:<Blogs/>
            },
            {
                path:`/${userRole}/blogs`,
                element:<Blogs/>
            },
            {
                path:`/${userRole}/blogs/view_blog/:blogID`,
                element:<View_Blog/>
            },
            {
                path:`/${userRole}/${userID}/blogs/view_blog/:blogID`,
                element:<View_Blog/>
            }
        
        ]
    }
])
export default router
