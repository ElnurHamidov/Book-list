import logo from './images/books.jpg';
import library from './images/library.jpg';
import {Link} from 'react-router-dom';
import avatar from './images/avatar.png';
import {useFormik} from 'formik';

export default function Login(){


    function validate(values){
        const errors={};

        if(!values.username){
            errors.username="Required";
        }else if(values.username.length<3 || values.username.length>8){
            errors.username="Your name should has 3-8 symbols";
        }

        if(!values.password){
            errors.password = 'Required';
        }else if(values.password.length<3 || values.password.length>8){
            errors.password = "Your password should has 3-8 symbols";
        }
        return errors;
    }

    const formik=useFormik({
        initialValues: {
            username: '',
            password: '',
        },
        validate,
        onSubmit: async values=>{
            fetch('https://apitester.pythonanywhere.com/api/user/register' , {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(values)
            })
            .then(res=>res.json())
            .then(json=>{
                if(!json.token){
                    alert('This account exist');
                    return;
                }
                localStorage.setItem('token' , json.token);
                window.location.href='/main';
            })
            .catch(err=>console.log(err))

        }
    })

    return(
        <div className="container">
            <div className="header">
                <h1>Book List</h1>
                <img src={logo} alt="books" className='header-img'/>
            </div>
            <div className="login-body">
                <div>
                    <img src={library} alt='library' className='login-img'/>
                </div>
                <div className="form">
                    <img src={avatar} alt="login avatar" className='form-avatar'/>
                    <form action="#" method="post" onSubmit={formik.handleSubmit}>
                        <label>Name or email</label>
                        <input type="text" name="username" id="username" placeholder='username' className='back1' value={formik.values.username} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.touched.username && formik.errors.username && <span>{formik.errors.username}</span>}
                        <label>Password</label>
                        <input type="password" name="password" id="password" placeholder='password' className='back2' value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                        {formik.touched.password && formik.errors.password && <span>{formik.errors.password}</span>}
                        <div>
                            <button type='submit'>Registration</button>
                            <Link to="/books">Back</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}