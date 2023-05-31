import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Table,Button } from 'react-bootstrap';

export default function AdministratoriLendet() {

  const [lendet, setLendet] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:5001/lenda/lendetAdministrator`);
        const lendet = result.data;
        setLendet(lendet);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);


  
  return (
    <div>
       <div className='p-4'>
        <Button className='btn btn-success mt-5 float-end'>Shto nje Lende</Button> 
       </div>
      <div className='container pt-5 mb-5 pb-5'>
      {lendet.length > 0 ? (
          <>
        <h2 className='my-3'>Lendet:</h2>
        <Table striped bordered hover className='mb-5 pb-5'>
            <thead>
            <tr>
                <th>Nr.</th>
                <th>Lenda</th>
                <th>Mesimdhenesi</th>
                <th>Viti</th>
                <th>Gjenerata</th>
                <th>Opsionet</th>
                
            </tr>
            </thead>
            <tbody>
            {lendet.map((item, index) => (
                <tr key={index}>
                <td>{index+1}</td>
                <td>{item.emri}</td>
                <td>{item.mesimdhenesi} / {item.stafiID}</td>
                <td>{item.viti}</td>
                <td>{item.gjenerata}</td>
                <td>
                    <Button className='btn btn-primary m-1'>Edit</Button>
                    <Button className='btn btn-danger m-1'>Delete</Button>
                </td>
                </tr>
            ))}
            </tbody>
        </Table>
        </>
        ) : (
            <h2 className='my-3'>Nuk ka ndonje Lende te regjistruar</h2>
        )}
      </div>
    </div>
  );
}
