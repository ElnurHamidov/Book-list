import {useState , useEffect} from 'react';
import Book from './Book';


export default function Main(){

    const [books, setBooks] = useState([]);

    useEffect( ()=>{
        async function getData(){
            fetch('https://apitester.pythonanywhere.com/api/books/' , {
                method: 'GET',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Token ${localStorage.token}`
                },
            })
            .then(res=>res.json())
            .then(json=>setBooks(json))
        };
        getData();
    } , [])

    return(
        <div className="container">
            <div className="header main">
                <div><h1>{localStorage.getItem('username')}</h1></div>
                <button className="main-btn" onClick={()=>window.location.href="/add"}>Add</button>
                <button className='main-btn' onClick={()=>{
                    localStorage.clear();
                    window.location.href='/';
                }}>Log out</button>
            </div>
            <div className="main-body">
                {books.map( (e,i) => <Book key={i} value={e}/>)}
            </div>
        </div>
    );
}