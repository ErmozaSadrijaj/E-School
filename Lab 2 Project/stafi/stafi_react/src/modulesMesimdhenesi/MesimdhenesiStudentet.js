import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../assets/css/mesimdhenesi.css';
import { id } from '../router';
import { Button } from 'react-bootstrap';
import VendosNotenModal from './VendosNotenModal';

export default function MesimdhenesiStudentet() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`https://localhost:44335/mesimdhenesiNxenes/${id}`);
        const userData = result.data;
        setUserData(userData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  /* ketu kemi filtrim e te dhenave ne baze te search */
  const [searchText, setSearchText] = useState('');

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = userData.filter((item) =>
    item.nxenesiID.includes(searchText)
  );

  const [showModal, setShowModal] = useState(false);
  const [selectedNxenesiID, setSelectedNxenesiID] = useState('');
  const [selectedEmriMbiemri, setSelectedEmriMbiemri] = useState('');
  const [SelectedNxID, setSelectedNxID] = useState('');

  const openModal = (nxenesiID, emri_mbiemri,nxID) => {
    setSelectedNxenesiID(nxenesiID);
    setSelectedEmriMbiemri(emri_mbiemri);
    setSelectedNxID(nxID);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <div>
      <br /><br />
      <div className='text-center pt-5 '>
        <input
          type='text'
          className='form-control w-50 mx-auto'
          placeholder='Kerko nxenesin ne baze te ID'
          value={searchText}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className='d-flex flex-row flex-wrap justify-content-center align-items-center container p-5'>
        {filteredData.map((item, index) => (
          <div key={index} className='d-flex flex-column studentCard flex-wrap m-2 rounded justify-content-center align-items-center w-25'>
            
            <div className='data d-flex flex-row flex-wrap'>
              <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" className='w-50 ' alt='User'></img>
              <div className='d-flex flex-column justify-content-center'>
                <h6 className='fs-5'>{item.emri_mbiemri}</h6>
                <p className=''>{item.nxenesiID}</p>
              </div>
            </div>
            <div className='buttons d-flex flex-row justify-content-between'>
             
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light' onClick={() => openModal(item.nxenesiID,item.emri_mbiemri,item.ID)}>
              Vendos Noten
            </Button>
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light ' disabled={item.mesimdhenesiID == id ? false : true} >
              Vendos Vëretjen
            </Button>
            <Button className='vendosBtn fw-bold border px-2 bg-primary text-light' disabled={item.mesimdhenesiID == id ? false : true} >
              Vendos Mungesat
            </Button>
            </div>
          </div>
        ))}
      </div>

      <VendosNotenModal showModal={showModal} closeModal={closeModal} nxenesiID={selectedNxenesiID} emriMbiemri={selectedEmriMbiemri} nxID={SelectedNxID}/>

    </div>
    
  );
}