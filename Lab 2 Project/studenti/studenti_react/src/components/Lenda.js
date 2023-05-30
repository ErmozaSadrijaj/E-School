import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Lenda() {
    const { lendaID } = useParams(); // ketu marrim URL si "lendaID = id"
    const [, id] = lendaID.split("="); // ndersa ketu ndahet id nga "lendaID ="

    const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/Dokumentet/${id}`);
        const userData = result.data;
        setUserData(userData); // set state here
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const formatDateTime = (dateTimeStr) => {
    const dateTime = new Date(dateTimeStr);
    const date = dateTime.toLocaleDateString();
    const time = dateTime.toLocaleTimeString();
    return `${date} - ${time}`;
  };

  return (
    <>
      <div className='py-5 px-3'>
        {userData.map((item, index) => (
            <div key={index}>
            <h2 className='mt-5'>Topic {index + 1}</h2>
            <hr></hr>
            <ul>
                <li className='fs-4' key="titulli">
                    <strong className=''>Titulli: </strong>
                    <a href={item.linku}>{item.titulli}</a>
                    </li>
                <li className='list-unstyled' key="data">
                    {formatDateTime(item.dataPublikimit)}
                </li>
            </ul>
            </div>
        ))}
      </div>
    </>
  );
}
