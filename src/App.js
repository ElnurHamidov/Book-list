import './App.css';
import {useState} from 'react';
import { Routes, Route} from 'react-router-dom';
import Login from './Login';
import Registration from './Registration';
import Main from './Main';
import Add from './Add';
import Context from './Context';
import Edit from './Edit';
import Error from './Error';


function App() {

  const [el, setEl]=useState({});
  function onEdit(obj){
    setEl(obj);
  }
  
  
  async function onDelete(id){
    fetch(`https://apitester.pythonanywhere.com/api/books/${id}/`, {
      method: 'DELETE',
      headers: {
        'Content-type' : 'application/json',
        'Authorization' : `Token ${localStorage.getItem('token')}`
      }
    })
    .then(res=>console.log(res))
    .then(json=> window.location.href="/main")
    .catch(err=>console.log(err))
  }

  const obj={
    onDelete,
    onEdit,
  }

  return (
    <Context.Provider value={obj}>
        <div className="wrapper">


          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/main" element={<Main />} />
            <Route path="/add" element={<Add />}/>
            <Route path="/edit" element={<Edit value={el}/>} />
            <Route path="*" element={<Error />} />
          </Routes>


        </div>
    </Context.Provider>
  );
}

export default App;
