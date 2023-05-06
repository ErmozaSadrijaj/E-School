import { Router, createBrowserRouter } from "react-router-dom";
import Layout from "./modules/Layout"
import FaqjaKryesore from "./modules/faqjaKryesore";
import Kontakti from "./modules/kontakti";
import RrethNesh from "./modules/rrethNesh";
import NotFound from "./modules/notFound";
import Identifikohu from "./modules/Identifikohu";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Layout />,
        children:[

            {
                path:'/',
                element:<FaqjaKryesore/>
            },
            {
                path:'/rrethNesh',
                element:<RrethNesh/>
            },
            {
                path:'/kontakti',
                element:<Kontakti/>
            },
            {
                path:'/identifikohu',
                element:<Identifikohu/>
            }
            
        ]
    },
    {
        
            path:'*',
            element:<NotFound/>
        
    }

])

export default router