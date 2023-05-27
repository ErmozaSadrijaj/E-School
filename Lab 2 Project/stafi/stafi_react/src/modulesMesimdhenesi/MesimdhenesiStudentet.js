import { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/mesimdhenesi.css';
import {id} from '../router'

export default function MesimdhenesiStudentet(){
     /* ketu marrim te dhenat e studenteve te mesimdhenesit aktual*/
     const [userData, setUserData] = useState({});
     useEffect(() => {
       async function fetchData() {
         try {
           const result = await axios.get(`https://localhost:44335/mesimdhenesiNxenes/${id}`);
           const userData = result.data
             
           setUserData(userData); 
         } catch (error) {
           console.error(error);
         }
       }
     
       fetchData();
     }, []);
     console.log(userData)
    return(
        <>
            Studentet e mesimdhenesit
        </>
    )
}