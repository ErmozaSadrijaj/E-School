import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table } from 'react-bootstrap';
import '../assets/css/lendet.css'

export default function Veretjet() {
  const url = document.URL;
  const a = url.split("=")[1];
  const id = a.split("/")[0];

  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44334/veretjet/${id}`);
        const userData = result.data;
        setUserData(userData);
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
      <div className='container pt-5 mb-5 pb-5'>
        {userData.length > 0 ? (
          <>
            <h2 className='my-3'>Veretjet e Nxenesit</h2>
            <Table striped bordered hover className='mb-5 pb-5'>
              <thead>
                <tr>
                  <th>Nr.</th>
                  <th>Komenti</th>
                  <th>Mesimdhenesi</th>
                  <th>Data dhe Ora</th>
                </tr>
              </thead>
              <tbody>
                {userData.map((item, index) => (
                  <tr key={index}>
                    <td>{index+1}</td>
                    <td>{item.komenti}</td>
                    <td>{item.stafiID}</td>
                    <td>{formatDateTime(item.dataVendosjes)}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </>
        ) : (
            <h2 className='my-3'>Nxenesi nuk ka Vërejtje te Vendosura</h2>
        )}
      </div>
      <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
    </>
  );
  
}
