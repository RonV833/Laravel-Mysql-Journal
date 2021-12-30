import './App.css';
import Todo from './components/Todo';
import axios from 'axios';
import Navbar from './components/Navbar';
import EditTask from './components/EditTask';
import EditThought from './components/EditThought';
import Thoughts from './components/Thoughts';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
axios.defaults.baseURL = "http://localhost:8000/";
function App() {
  return (
    <div className="App">
      <Router>
      <Navbar/>{<br></br>}
      <Routes>
          <Route exact path = "/savetask" element={<Todo/>}></Route>
          <Route exact path="/savetask/edittask/:id" element={<EditTask/>}></Route> 
          <Route exact path = "/savethought" element={<Thoughts/>}></Route>
          <Route exact path="/savethought/editthought/:id" element={<EditThought/>}></Route> 
      </Routes>
      </Router>
    </div>
  );
}

export default App;
