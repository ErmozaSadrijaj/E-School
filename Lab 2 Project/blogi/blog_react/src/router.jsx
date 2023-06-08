import {createBrowserRouter,Navigate} from 'react-router-dom'
import BlogLayout from './components/BlogLayout'
import Blogs from './components/Blogs';
import View_Blog from './components/View_Blog';


export const id = '4';
localStorage.setItem('UserRole','administratori')
export const userRole = localStorage.getItem('UserRole')

const router = createBrowserRouter([
    {
        path:'/',
        element:<BlogLayout/>,
        children:[
            {
                path:'/',
                element:<Navigate to={`/blogs`} replace />
            },
            {
                path:`/blogs`,
                element:<Blogs/>
            },
            {
                path:`/view_blog/:blogID`,
                element:<View_Blog/>
            }
        ]
    }
])
export default router
