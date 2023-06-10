
import { useEffect, useState } from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios';
import '../assets/css/nxenesi.css';
import {userID} from '../router'
export default function Nxenesi() {
  
  const [userData, setUserData] = useState({});
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/nxenesi/${userID}`);
        const userData = result.data[0]
          
        setUserData(userData); 
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchData();
  }, []);

  return (
    <div className='d-flex justify-content-center flex-column'>
      <div id="section1" className='d-flex flex-row flex-wrap justify-content-center mt-4'>
        <div className="d-flex flex-row flex-wrap w-50 mt-5 sec2 p-3 rounded">
          <div id="content1" className=" d-flex flex-column align-items-start justify-content-end w-50">
            <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" className="w-50 p-0 mb-2 border rounded" alt='User' />
            <p><b>Emri dhe Mbiemri:</b>{userData.emri_mbiemri}</p>
            <p><b>ID:</b>{userData.nxenesiID}</p>
            <p><b>Email:</b>{userData.email}</p>
          </div>
          <div id="content2" className="d-flex flex-column align-items-start justify-content-end">
            <h3 className='border-bottom border-dark p-2'>Te Dhenat Personale:</h3>
            <br />
            <p><b>Vendbanimi:</b>{userData.vendbanimi}</p>
            <p><b>Nr.Telefonit:</b>{userData.nrTelefonit}</p>
            <p><b>Drejtimi:</b>{userData.drejtimi}</p>
            <p><b>Emri i Prindit:</b>{userData.emriPrindit}</p>
          </div>
        </div>
      </div>
      <br /><br /><hr /><br /><br />
      <div id="section2" className="d-flex flex-row flex-wrap justify-content-around align-items-center m-5">
        <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/mungesat`}>Gjenero Mungesat</Link>
        <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/notat`}>Gjenero Notat</Link>
        <Link className='p-4 fs-3 rounded bg-primary text-white bold' to={`/nxenesi/${userID}/veretjet`}>Gjenero Vërejtjet</Link>
      </div>
      <br /><br /><br />
    </div>
  );
}
