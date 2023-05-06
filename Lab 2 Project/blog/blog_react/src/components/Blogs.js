import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar'
import '../assets/css/blog.css'
import Logo from '../assets/images/logo.png'
import Footer from './Footer' 
import { AiOutlineCloseCircle } from 'react-icons/ai'
import {Link} from 'react-router-dom'
function Blogs() {
    /* ketu marrim Tags nga node JS*/
    const [tags, setTags] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3002/tags')
        .then(response => setTags(response.data))
        .catch(error => console.error(error));
    }, []);

    
     /* ketu marrim Blogs nga node JS*/
    const [blogPosts, setBlogPosts] = useState([]);
    useEffect(() => {
      axios.get('http://localhost:3002/blogs')
        .then(response => setBlogPosts(response.data))
        .catch(error => console.error(error));
    }, []);
    /*Sortimi i blogs ne topBlogs */
    const sortedTopBlogs = blogPosts.sort((a,b) => b.kliket - a.kliket)
    const topBlogs = sortedTopBlogs.slice(0,3)

    /* hooks per te shfaqur vetem tags e klikuara */
    const [clickedTags, setClickedTags] = useState([]);
    const [activeTag, setActiveTag] = useState(null);
    const handleTagClick = (event) => {
        const tagId = parseInt(event.target.getAttribute('value'));
        setClickedTags([...clickedTags, tagId]);
      };

    const filteredBlogPosts = clickedTags.length === 0 ? blogPosts : blogPosts.filter((post) => 
        clickedTags.every((tagId) => post.tags.some((tag) => tag.id === tagId))
    );


  

console.log(clickedTags);


  return (
    <div>
        <Navbar />
        
        <div id='section1' className='d-flex justify-content-center align-items-center '>
            <img className='w-25 logo' src={Logo} alt="logo" />
        </div>

        <div id='section 2' className='d-flex flex-row flex-wrap'>
            <h3 className='p-2'>Filtro:</h3>
                {tags.map((tag) => (
                    <div  key={tag.id}>
                        <p id="tagBtn" className='p-2 m-1 fs-3 oneTag d-flex flex-row flex-wrap justify-content-center align-items-center' value={tag.id} onClick={handleTagClick}>
                        <span className='p-0 mb-1  d-none' id='ikona'>
                                <AiOutlineCloseCircle/>
                            </span> 
                            {tag.emri}
                        </p>
                    </div>
                ))}    
        </div>
        <hr/>

        <div id='section3' className='d-flex justify-content-center m-1 flex-row flex-wrap'>
            {filteredBlogPosts.map((blogPost) => (
                <div className="blogCard rounded d-flex flex-column flex-wrap m-3" key={blogPost._id}>
                    <img className='w-100 rounded' src={'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'} />
                    <h2 className='m-1'>{blogPost.titulli}</h2><hr/>
                    <p className='m-1'>{blogPost.permbatja.substring(0,60)}</p><hr/>
                    <span className='d-flex flex-wrap flex-row justify-content-between'>
                        <p className='p-1 mx-2'><b>Autori:</b> {blogPost.autoriID}</p>
                        <Link className='p-2 mx-2 readMoreBtn bg-primary' to={`/view_blog?id=${blogPost._id}`}>Lexo me Shumë</Link>
                    </span>
                </div>
            ))}
        </div>

        <div id='section4' >
            <div className='content1 text-center bg-dark light'>
                <h1 className='p-2 topHeader'>Top Bloget me te shikuara</h1>
            </div>
            <div className='content2 d-flex justify-content-center m-1 flex-row flex-wrap'>
                {topBlogs.map((topBlog) => (
                    <div className="blogCard rounded d-flex flex-column flex-wrap m-3" key={topBlog.id}>
                        <img className='w-100 rounded' src={'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'} />
                        <h2 className='m-1'>{topBlog.titulli}</h2><hr/>
                        <p className='m-1'>{topBlog.permbatja.substring(0,60)}</p><hr/>
                        <p className='p-1 ml-1'><b>Autori:</b> {topBlog.autoriID}</p>
                    </div>
                ))}
            </div>
        </div>
        <Footer />
    </div>
  );
  
}

export default Blogs;


/*<h1>Blog Posts</h1>
      {blogPosts.map((blogPost) => (
        <div key={blogPost._id}>
          <h2>{blogPost.titulli}</h2>
          <p>{blogPost.permbatja}</p>
          <p>Written by: {blogPost.autoriID}</p>
        </div>
      ))}
      
      
      
      
      
      {tags.map((tag) => (
        <div key={tag.id}>
          <h2>{tag.emri}</h2>
          
        </div>
      ))}*/