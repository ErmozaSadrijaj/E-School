// ShtoKomentinModal.js
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import axios from 'axios';

const ShtoKomentinModal = ({ showModal, closeModal ,blogID}) => {
  const [comment, setComment] = useState('');

  const handleShtoKomentin = () => {


    const newComment = {
        autoriID: blogID, 
        komenti: comment,
        data: new Date().toISOString(), 
      };
    
      axios.post('http://localhost:3002/comments', newComment)
        .then(response => {
          console.log('Komenti u Shtua me Sukses:', response.data);
        })
        .catch(error => {
          console.error('Komenti nuk mund te shtohet,ju lutem provoni me vone:', error);
        });
    
      closeModal();
    };
 

  return (
    <Modal show={showModal} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>Shto Komentin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <textarea
  className='form-control'
  rows={5}
  value={comment}
  onChange={(event) => setComment(event.target.value)}
  placeholder='Shkruaj komentin...'
/>

      </Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={closeModal}>
          Anulo
        </Button>
        <Button variant='primary' onClick={handleShtoKomentin}>
          Shto Komentin
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ShtoKomentinModal;
