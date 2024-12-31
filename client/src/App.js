import './App.css';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Login from './login';
import Signup from './signup';
import Show from './show';
import Edit from './edit';
function App() {
  return (
   <BrowserRouter>
   <Routes>
    <Route index element = {<Login/>}></Route>
    <Route path = '/sign_up' element = {<Signup/>}></Route>
    <Route path = '/login' element = {<Login/>}></Route>
    <Route path = '/show' element = {<Show/>}></Route>
    <Route path = '/edit/:id'  element = {<Edit/>}></Route>
   </Routes>
   </BrowserRouter>
  );
}

export default App;
