import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import '../assets/css/blog.css';
import Logo from '../assets/images/logo.png';
import Footer from './Footer';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Link } from 'react-router-dom';

function Blogs() {
    localStorage.setItem('UserRole','nxenes')
    localStorage.setItem('UserID','1')
    const [tags, setTags] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const [clickedTags, setClickedTags] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3002/tags')
      .then(response => setTags(response.data))
      .catch(error => console.error(error));

    axios.get('http://localhost:3002/blogs')
      .then(response => setBlogPosts(response.data))
      .catch(error => console.error(error));
  }, []);

  const handleTagClick = (tagId) => {
    if (clickedTags.includes(tagId)) {
      setClickedTags(clickedTags.filter(id => id !== tagId));
    } else {
      setClickedTags([...clickedTags, tagId]);
    }
  };

  const filteredBlogPosts = clickedTags.length === 0
    ? blogPosts
    : blogPosts.filter(post => post.tags.some(tag => clickedTags.includes(tag.id)));

  return (
    <div>
      <Navbar />

      <div id='section1' className='d-flex justify-content-center align-items-center '>
        <img className='w-25 logo' src={Logo} alt="logo" />
      </div>

      <div id='section 2' className='d-flex flex-row flex-wrap'>
        <h3 className='p-2'>Filtro:</h3>
        {tags.map(tag => (
          <div key={tag.id}>
            <p
              id="tagBtn"
              className={`p-2 m-1 fs-3 oneTag d-flex flex-row flex-wrap justify-content-center align-items-center ${clickedTags.includes(tag.id) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag.id)}
            >
              {clickedTags.includes(tag.id) && (
                <span className='p-0 mb-1' id='ikona'>
                  <AiOutlineCloseCircle />
                </span>
              )}
              {tag.emri}
            </p>
          </div>
        ))}
      </div>
      <hr />

      <div id='section3' className='d-flex justify-content-center m-1 flex-row flex-wrap'>
        {filteredBlogPosts.map(blogPost => (
          <div className="blogCard rounded d-flex flex-column flex-wrap m-3" key={blogPost._id}>
            <img className='w-100 rounded' src={'https://images.pexels.com/photos/268533/pexels-photo-268533.jpeg?cs=srgb&dl=pexels-pixabay-268533.jpg&fm=jpg'} />
            <h2 className='m-1'>{blogPost.titulli}</h2>
            <hr />
            <p className='m-1'>{blogPost.permbatja.substring(0, 60)}</p>
            <hr />
            <span className='d-flex flex-wrap flex-row justify-content-between'>
              <p className='p-1 mx-2'><b>Autori:</b> {blogPost.autoriID}</p>
              <Link className='p-2 mx-2 readMoreBtn bg-primary' to={`/view_blog?id=${blogPost._id}`}>Lexo me Shumë</Link>
            </span>
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
}

export default Blogs;
