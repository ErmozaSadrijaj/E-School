import React, { useState, useEffect } from 'react';
import { Form, FormControl, Button, Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

export default function Libraria() {
  const [librat, setLibrat] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await axios.get(`http://localhost:3002/`);
        const librat = result.data;
        setLibrat(librat);
      } catch (error) {
        console.error(error);
      }
    }

    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredLibrat = librat.filter((libri) =>
    libri.titulli.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedLibrat = [...filteredLibrat].sort((a, b) => {
    if (sortOption === 'kliket-desc') {
      return b.kliket - a.kliket;
    } else if (sortOption === 'kliket-asc') {
      return a.kliket - b.kliket;
    } else if (sortOption === 'date-desc') {
      return new Date(b.dataPublikimit) - new Date(a.dataPublikimit);
    } else if (sortOption === 'date-asc') {
      return new Date(a.dataPublikimit) - new Date(b.dataPublikimit);
    } else {
      return 0;
    }
  });

  return (
    <Container>
        <br/><br/><br/><br/>
      <Row className="mb-4">
        <Col md={6}>
          <Form inline>
            <FormControl
              type="text"
              placeholder="Kerko librin"
              value={searchTerm}
              onChange={handleSearch}
            />
          </Form>
        </Col>
        <Col md={6}>
          <Form inline className="float-md-right">
            <FormControl as="select" value={sortOption} onChange={handleSort}>
              <option value="">Sorto Librat:</option>
              <option value="kliket-desc">Me te Klikuarit</option>
              <option value="kliket-asc">Me pak te Klikuarit</option>
              <option value="date-desc">Nga Data me e Fundit e Publikimit</option>
              <option value="date-asc">Nga Data me e Hershme e Publikimit</option>
            </FormControl>
          </Form>
        </Col>
      </Row>
      <br/>
      <Row>
        {sortedLibrat.map((libri) => (
          <Col key={libri._id} md={4} sm={6} xs={12} className="mb-4">
            <Card>
              <Card.Img variant="top" src={libri.fotoPath} alt="Book Cover" />
              <Card.Body>
                <div className='d-flex flex-row flex-wrap justify-content-between fs-5 mb-2'>
                    <Card.Title >{libri.titulli}</Card.Title>
                    <Card.Title>{libri.autori}</Card.Title>
                </div>
                <Card.Text>Data: {formatDate(libri.dataPublikimit)}</Card.Text>
                <Card.Text>ISBN:{libri.isbn}</Card.Text>
                <Button variant="primary" className="w-100" href={libri.linku} target="_blank">
                    Lexo Librin...
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
