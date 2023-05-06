import { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, FormGroup, Label, Input } from 'reactstrap';
import '../assets/css/faqjaKryesore.css'
import {Link} from 'react-router-dom'
const Identifikohu = () => {
  const [modal, setModal] = useState(false);
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const toggleModal = () => setModal(!modal);

  const handleButtonNxenesiClick = () => {
    setTitle('Identifikohu si Nxenes ose Prind');
    toggleModal();
  };

  const handleButtonStafiClick = () => {
    setTitle('Identifikohu si Mesimdhenes, Administrator, Drejtor');
    toggleModal();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
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
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" value={email} onChange={handleInputChange} />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" value={password} onChange={handleInputChange} />
            </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" href="http://localhost:3005/">Identifikohu</Button>            {' '}
             <Button color="secondary" onClick={toggleModal}>Anulo</Button>
            </ModalFooter>
        </Modal>
      </div>
    </div>
  );
};

export default Identifikohu;
