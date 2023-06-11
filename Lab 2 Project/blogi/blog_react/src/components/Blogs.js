import React,{useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import '../assets/css/blog.css'
import axios from 'axios'
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { userID, userRole } from '../router';


export default function Blogs()  {
  const [blogs, setBlogs] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/aprovuar`);

          const blogs = result.data
            
          setBlogs(blogs); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

    const [tags, setTags] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const result = await axios.get(`https://localhost:5002/tags`);
          const tags = result.data          
          setTags(tags); 
        } catch (error) {
          console.error(error);
        }
      }
    
      fetchData();
    }, []);

    const [clickedTags, setClickedTags] = useState([]);

    const handleTagClick = (tagId) => {
      if (clickedTags.includes(tagId)) {
        setClickedTags(clickedTags.filter(ID => ID !== tagId));
      } else {
        setClickedTags([...clickedTags, tagId]);
      }
    };
  
    const filteredBlogPosts = clickedTags.length === 0 || tags.length === 0
  ? blogs
  : blogs.filter(post => post.tags && post.tags.some(tag => clickedTags.includes(tag.ID)));

  
  return (
    <div >
      <br></br><br></br><br></br><br></br>
      <div id='section 2' className='d-flex flex-row flex-wrap'>
        <h3 className='p-2'>Filtro:</h3>
        {tags.map(tag => (
          <div key={tag.ID}>
            <p
              id="tagBtn"
              className={`p-2 m-1 fs-3 oneTag d-flex flex-row flex-wrap justify-content-center align-items-center ${clickedTags.includes(tag.ID) ? 'active' : ''}`}
              onClick={() => handleTagClick(tag.ID)}
            >
              {clickedTags.includes(tag.ID) && (
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
            <p className='m-1 fs-5'>{blogPost.permbatja.substring(0, 30)}...</p>
            <hr />
            <span className='d-flex flex-wrap flex-row justify-content-between'>
              <p className='p-1 mx-2'><b>Autori:</b> {blogPost.emri_mbiemri}</p>
              {userRole == 'vizitori' 
              && <Link className='p-2 mx-2 readMoreBtn bg-primary' to={`/${userRole}/blogs/view_blog/${blogPost.ID}`}>Lexo me Shumë</Link>}
              {userRole !== 'vizitori' 
              && <Link className='p-2 mx-2 readMoreBtn bg-primary' to={`/${userRole}/${userID}/blogs/view_blog/${blogPost.ID}`}>Lexo me Shumë</Link>}
            </span>
          </div>
        ))}
      </div>

    </div>
  );
};

