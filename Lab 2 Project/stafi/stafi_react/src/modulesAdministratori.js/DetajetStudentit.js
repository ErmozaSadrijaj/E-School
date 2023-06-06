import React , {useState,useEffect} from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom';
import {Table,Button} from 'react-bootstrap'


export default function DetajetStudentit(){
    const { studentiID } = useParams(); // ketu marrim URL si "lendaID = id"
    const [, id] = studentiID.split("="); // ndersa ketu ndahet id nga "lendaID ="

    const [studenti, setStudenti] = useState([]);
    const [lendet, setLendet] = useState([]);
    const [mungesat, setMungesat] = useState([]);
    const [notat, setNotat] = useState([]);
    const [veretjet, setVeretjet] = useState([]);

    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5001/nxenesi/${id}`);
          const studenti = result.data[0];
          setStudenti(studenti);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);
    
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5001/lenda_nxenesi/${id}`);
          const lendet = result.data;
          setLendet(lendet);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:5001/mungesat/${id}`);
            const mungesat = result.data;
            setMungesat(mungesat);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

    useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:5001/notat/${id}`);
            const notat = result.data;
            setNotat(notat);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

      useEffect(() => {
        async function fetchData() {
          try {
            const result = await axios.get(`https://localhost:5001/veretjet/${id}`);
            const veretjet = result.data;
            setVeretjet(veretjet);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
      }, []);

      const formatDateTime = (dateTimeStr) => {
        const dateTime = new Date(dateTimeStr);
        const date = dateTime.toLocaleDateString();
        return `${date}`;
      };
    return(
        <>
        <br></br><br></br>

            <div className="container d-flex justify-content-center align-items-center flex-column pt-5 mb-5 ">
                <h2 className='text-start'>Te Dhenat e Studentit:</h2>
                <div className="d-flex flex-row flex-wrap justify-content-center w-75 mt-5 sec2 p-3 rounded contaier">
                    <div id="content1" className=" d-flex flex-column align-items-start justify-content-end w-50">
                    <img src="https://cdn-icons-png.flaticon.com/512/2815/2815428.png" className="w-25 p-0 mb-2 border rounded" alt='User' />
                    <p><b>Emri dhe Mbiemri:</b>{studenti.emri_mbiemri}</p>
                    <p><b>ID:</b>{studenti.nxenesiID}</p>
                    <p><b>Email:</b>{studenti.email}</p>
                    </div>
                    <div id="content2" className="d-flex flex-column align-items-start justify-content-end">
                    <br />
                    <p><b>Vendbanimi:</b>{studenti.vendbanimi}</p>
                    <p><b>Nr.Telefonit:</b>{studenti.nrTelefonit}</p>
                    <p><b>Prindi:</b>{studenti.emriPrindit}</p>
                    <p><b>Drejtimi:</b>{studenti.drejtimi}</p>
                    </div>
                </div>
            </div>

            <div className='d-flex flex-row flex-wrap justify-content-center border-top'>

                <div className="container-fluid d-flex justify-content-center align-items-center flex-column pt-5 mb-5 w-50 ">
                    <h2 className='text-start'>Lendet e Studentit:</h2>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                    {lendet.length > 0 ? (
                        <div>
                            <Table striped bordered hover className='mb-5 pb-5'>
                                <thead>
                                <tr>
                                    <th>Nr.</th>
                                    <th>Emri i Lendes</th>
                                    <th>Viti i Lendes</th>
                                    <th>Opsionet</th>
                                </tr>
                                </thead>
                                <tbody>
                                {lendet.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.lenda}</td>
                                    <td>{item.viti}</td>
                                    <td>
                                        <Button className='btn btn-primary m-1'  >Ndrysho</Button>
                                        <Button className='btn btn-danger m-1' >Largo</Button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        ) : (
                            <h2 className='my-3'>Nxenesi nuk ka ndonje Lende te Regjistruar</h2>
                        )}
                        
                    </div>
                </div>

                <div className="container d-flex justify-content-center align-items-center flex-column pt-5 mb-5 w-50">
                    <h2 className='text-start'>Mungesat e Studentit:</h2>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                    {mungesat.length > 0 ? (
                        <div>
                            <Table striped bordered hover className='mb-5 pb-5'>
                                <thead>
                                <tr>
                                    <th>Nr.</th>
                                    <th>Me Arsye</th>
                                    <th>Pa Arsye</th>
                                    <th>Data e Vendosjes</th>
                                    <th>Opsionet</th>
                                </tr>
                                </thead>
                                <tbody>
                                {mungesat.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.meArsyje}</td>
                                    <td>{item.paArsyje}</td>
                                    <td>{formatDateTime(item.dataMungesave)}</td>
                                    <td>
                                        <Button className='btn btn-primary m-1'  >Ndrysho</Button>
                                        <Button className='btn btn-danger m-1' >Largo</Button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        ) : (
                            <h2 className='my-3'>Nxenesi nuk ka Mungesa te Regjistruara</h2>
                        )}
                        
                </div>
                </div>
            </div>


            <div className='d-flex flex-row flex-wrap justify-content-center border-top'>
                <div className="container d-flex justify-content-center align-items-center flex-column pt-5 mb-5">
                    <h2 className='text-start'>Notat e Studentit:</h2>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                    {notat.length > 0 ? (
                        <div>
                            <Table striped bordered hover className='mb-5 pb-5'>
                                <thead>
                                <tr>
                                    <th>Nr.</th>
                                    <th>Lenda</th>
                                    <th>Nota Numer</th>
                                    <th>Nota Shkronje</th>
                                    <th>Mesimdhenesi</th>
                                    <th>Data e Vendosjes</th>
                                    <th>Opsionet</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notat.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.Lenda}</td>
                                    <td>{item.notaNumer}</td>
                                    <td>{item.notaShkronje}</td>
                                    <td>{item.Mesimdhenesi}</td>
                                    <td>{formatDateTime(item.dataVendosjes)}</td>
                                    <td>
                                        <Button className='btn btn-primary m-1'  >Ndrysho</Button>
                                        <Button className='btn btn-danger m-1' >Largo</Button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        ) : (
                            <h2 className='my-3'>Nxenesi nuk ka Nota te Regjistruara</h2>
                        )}
                        
                </div>
                </div>
            </div>

            <div className='d-flex flex-row flex-wrap justify-content-center border-top'>
                <div className="container d-flex justify-content-center align-items-center flex-column pt-5 mb-5">
                    <h2 className='text-start'>Notat e Studentit:</h2>
                    <div className="d-flex flex-row flex-wrap justify-content-center">
                    {notat.length > 0 ? (
                        <div>
                            <Table striped bordered hover className='mb-5 pb-5 w-100'>
                                <thead>
                                <tr>
                                    <th>Nr.</th>
                                    <th>Komenti</th>
                                    <th>Data e Vendosjes</th>
                                    <th>Mesimdhensi</th>
                                    <th>Opsionet</th>
                                </tr>
                                </thead>
                                <tbody>
                                {notat.map((item, index) => (
                                    <tr key={index}>
                                    <td>{index+1}</td>
                                    <td>{item.komenti}</td>
                                    <td>{formatDateTime(item.dataVendosjes)}</td>
                                    <td>{item.Mesimdhenesi}</td>
                                    <td>
                                        <Button className='btn btn-primary m-1'  >Ndrysho</Button>
                                        <Button className='btn btn-danger m-1' >Largo</Button>
                                    </td>
                                    </tr>
                                ))}
                                </tbody>
                            </Table>
                            </div>
                        ) : (
                            <h2 className='my-3'>Nxenesi nuk ka Nota te Regjistruara</h2>
                        )}
                        
                </div>
                </div>
            </div>
        </>
    )
}