import './App.css';
import Login from './components/login/Login';
import Main from './components/main/main'
import { Routes, Route } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Mypage from './components/mypage';

function App() {
  return (
          <Routes>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/" element={<Main />}></Route>
            <Route path="/signup" element={<Signup />}></Route> 
            <Route path="/mypage" element={<Mypage />}></Route> 
          </Routes>
  );
}

export default App;
