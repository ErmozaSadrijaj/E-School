import {useLocation} from 'react-router-dom'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import Footer from './Footer'
import '../assets/css/view_blog.css'
function View_Blog() {
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

    console.log(comments)
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
        
            <div>
                <h5 className='fs-3 m-2'>Komentet:</h5>
                <hr/>
                <div>
                    {comments.map((comment) => (
                        <div className='komentSection bg-warning d-flex justify-content-start flex-wrap flex-column mx-1 p-2'>
                            <h6>{comment.autoriID}:</h6>
                            <p>{comment.komenti}</p>
                            <p className='d-flex justify-content-end'><b>{comment.data}</b></p>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </>
    )
}
export default View_Blog