import {useLocation} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './Footer'
import '../assets/css/view_blog.css'
import ShtoKomentinModal from './Modals/ShtoKomentinModal';


function View_Blog() {

    const userRole = localStorage.getItem('UserRole')
    const userID = localStorage.getItem('UserID')

    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    /* blogs dhe sortimi ne nje blog */
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3002/blogs')
        .then(response => setBlogPosts(response.data))
        .catch(error => console.error(error));
    }, []);
    /*Sortimi i blogs ne topBlogs */
    const blogPost = blogPosts.find(post => post._id === id);

    const [comments, setComments] = useState([]);
    useEffect(() => {
      axios.get(`http://localhost:3002/comments/${id}`)
        .then(response => setComments(response.data))
        .catch(error => console.error(error));
    }, []);

    const [showShtoKomentinModal,setShowShtoKomentinModal] = useState(false)
    const [blogID,setBlogID] = useState('')

    const openShtoKomentinModal =(blogID)=>{
        setBlogID(blogID)
        setShowShtoKomentinModal(true)
    }
    const closeShtoKomentinModal = () =>{
        setShowShtoKomentinModal(false)
    }
    
    return (
        <>  
            <Navbar />

            <div className='section mt-2 1 d-flex flex-wrap flex-row justify-content-center align-items-center'>
                <div className='w-50 mx-5 d-flex justify-content-end'>
                    <img className='rounded' src={blogPost?.foto}></img>    
                </div>       
                <div className='w-25 mx-5 p-5 rounded data bg-warning'>
                    <h1 className=' bg-warning'>{blogPost?.titulli}</h1>
                    <h5><b>Autori:</b>{blogPost?.autoriID}</h5>
                    <h5><b>Data E Publikimit:</b>{blogPost?.dataPublikimit}</h5>
                </div>
            </div>
            
            <div id='section2' className='d-flex mt-2 justify-content-center px-1 mx-5 rounded fs-5 '>
                {blogPost?.permbatja}
            </div>
            <br></br>

            <div className='comments-container'>
                <div className='comments-header d-flex justify-content-between align-items-center border-top pt-5'>
                    <h2 className='comments-heading fs-4'>Komentet:</h2>
                    {userRole === 'nxenes' && (
                    <Button className='add-comment-button' onClick={() => openShtoKomentinModal(id)}>Shto Komentin</Button>
                    )}
                </div>
                <hr />
                <div className='comments-list'>
                    {comments.map((comment) => (
                    <div className='comment-section bg-light p-3 rounded mb-3' key={comment.id}>
                        <h6 className='comment-author fs-6'>{comment.autoriID}:</h6>
                        <p className='comment-text'>{comment.komenti}</p>
                        <p className='comment-date text-end fs-7'>{comment.data}</p>
                    </div>
                    ))}
                </div>
            </div>


            <Footer />

            <ShtoKomentinModal showModal={showShtoKomentinModal} closeModal={closeShtoKomentinModal} blogID={blogID}/>
        </>
    )
}
export default View_Blog