import './App.css';
import Login from './components/login/Login';
import Main from './components/main/main'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Mypage from './components/mypage';
import Blog from './components/blog/blog';
import BlogAdd from './components/blog/blog_add/blog_add';
import BlogEdit from './components/blog/blog_edit/blog_edit';

function App() {
  return (
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={<Signup />}></Route> 
            <Route path="/mypage" element={<Mypage />}></Route> 
            <Route path='/blog' element={<Blog/>}></Route>
            <Route path='/blog/add' element={<BlogAdd/>}></Route>
            <Route path='/blog/edit' element={<BlogEdit/>}></Route>
          </Routes>
  );
}

export default App;
