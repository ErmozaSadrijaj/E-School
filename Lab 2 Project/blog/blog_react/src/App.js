import { BrowserRouter,Routes, Route,Navigate } from 'react-router-dom';
import Blogs from './components/Blogs';
import View_Blog from './components/View_Blog';

function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to = "/blogs"/>} />
        <Route path="/blogs" element={<Blogs />} />
        <Route path="/view_blog" element={<View_Blog/>} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;