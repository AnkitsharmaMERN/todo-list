import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './component/pages/Login/Login';
import Profile from './component/pages/Profile/Profile';
import Registration from './component/pages/Registration/Registration';
import Forgetpassword from './component/pages/Forgetpassword/Forgetpassword';
import Tasktable from './component/task/Tasktable';
import Removetask from './component/task/Removetask'
import UpdateDetails from "./component/pages/Profile/UpdateDetails"
import { Resetpassword } from './component/pages/Forgetpassword/Resetpassword';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/' element={<Profile />} />
          <Route exact path='/signup' element={<Registration />} />
          <Route exact path= '/forgetpassword' element={<Forgetpassword/>}/>
          <Route exact path='/resetPassword' element={<Resetpassword/>}/>
          <Route exact path='/addtask' element={<Tasktable/>}/>
          <Route exact path='/removepage/:id' element={<Removetask/>}/>
          <Route exact path='/updatedetails' element={<UpdateDetails/>}/>
        </Routes>

      </Router>

    </>
  );
}

export default App;
