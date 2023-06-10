import {  useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import axios from 'axios';
import '../assets/css/faqjaKryesore.css';

const Identifikohu = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [lloji,setLloji] = useState('')

  const toggleModal = () => setModal(!modal);

  const handleButtonNxenesiClick = () => {
    setTitle('Identifikohu si Nxenes ose Prind');
    setLloji('nxenesi')
    toggleModal();
  };

  const handleButtonStafiClick = () => {
    setTitle('Identifikohu si Mesimdhenes, Administrator, Drejtor');
    setLloji('stafi')
    toggleModal();
  };

  const gabimMesazhi = document.getElementById('gabimMesazhi');

  const handleSubmit = async (event) => {
    gabimMesazhi.classList.add('d-none');
    event.preventDefault();
    try {
      if(lloji == 'nxenesi'){

        const response = await axios.get(`https://localhost:5004/admin/users/nxenes/${id}/${password}`);
        const userData = response.data;
      
        if (userData.length != 0) {
          const userID = userData[0].ID
          const userRole = userData[0].role
          
          window.location.href = `http://localhost:3005/${userRole}/${userID}`
        } else {
          gabimMesazhi.classList.remove('d-none');
        }

      }else {
        const response = await axios.get(`https://localhost:5004/admin/users/staf/${id}/${password}`);
        const userData = response.data;
      
        if (userData.length != 0) {
          const userID = userData[0].ID
          const userRole = userData[0].roli
          window.location.href = `http://localhost:3006/${userRole}/${userID}`
        } else {
          gabimMesazhi.classList.remove('d-none');
        }
      }
      
    } catch (error) {
      console.error(error);
    }
    
  };

  return (
    <div className='d-flex justify-content-center'>
      <div id='butonatPerIdentifikim' className='d-flex justify-content-center m-5 align-items-center h-100'>
        <Button className='px-5 py-3 fs-3 m-5' onClick={handleButtonNxenesiClick}>NXENESI</Button>
        <Button className='px-5 py-3 fs-3 m-5' onClick={handleButtonStafiClick}>STAFI</Button>
        <Modal isOpen={modal} toggle={toggleModal}>
          <ModalHeader toggle={toggleModal}>{title}</ModalHeader>
          <ModalBody>
            <FormGroup>
              <Label for="id">ID e Shkolles:</Label>
              <Input type="text" name="id" id="id" value={id}  onChange={(e) => setId(e.target.value)} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" value={password}  onChange={(e) => setPassword(e.target.value)} />
            </FormGroup>
            <p id='gabimMesazhi' className='d-none'>Te Dhenat e Shenuara Jane Gabim!</p>
          </ModalBody>
          <ModalFooter>
            
            <Button color="primary" onClick={handleSubmit}>Identifikohu</Button>
            <Button color="secondary" onClick={toggleModal}>Anulo</Button>
          </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Identifikohu;
