import {useFormik} from 'formik';
import { AiOutlineArrowLeft } from "react-icons/ai";


export default function Edit(props){

    const validate=values=>{
        const errors={};

        if(!values.name){
            errors.name="Required"
        }else if(values.name.length<3){
            errors.name='Should be at least 3 symbols';
        }

        if(!values.author){
            errors.author="Required"
        }else if(values.author.length<2){
            errors.author='Should be at least 2 symbols';
        }

        if(!values.page){
            errors.page="Required"
        }else if(!isFinite(values.page)){
            errors.page='Should be normal number';
        }

        
        if(!values.price){
            errors.price="Required"
        }else if(!isFinite(values.price)){
            errors.price='Should be normal number';
        }

        return errors;
    }

    const formik = useFormik({
        initialValues: {
           name: props.value.name,
           author: props.value.author,
           page: props.value.page,
           price: props.value.price,      
        },
        validate,
        onSubmit: async values=>{
            fetch(`https://apitester.pythonanywhere.com/api/books/${props.value.id}/` , {
                method: 'PATCH',
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Token ${localStorage.getItem('token')}`
                },
                body: JSON.stringify(values)
            })
            .then(res=>res.json())
            .then(json=>window.location.href='/main')
            .catch(error=>console.log(error))   
        }
    })

    return(
        <div className="container">
            <div className="add">
                <form action="#" method="get" onSubmit={formik.handleSubmit}>
                    <label>Book name</label>
                    <input type="text" name='name' id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.name && formik.errors.name && <span>{formik.errors.name}</span>}
                    <label>Author</label>
                    <input type="text" name='author' id="author" value={formik.values.author} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.author && formik.errors.author && <span>{formik.errors.author}</span>}
                    <label>Pages</label>
                    <input type="text" name='page' id="page" value={formik.values.page} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.page && formik.errors.page && <span>{formik.errors.page}</span>}
                    <label>Price</label>
                    <input type="text" name='price' id="price" value={formik.values.price} onChange={formik.handleChange} onBlur={formik.handleBlur}/>
                    {formik.touched.price && formik.errors.price && <span>{formik.errors.price}</span>}
                    <div>
                        <button type="submit">Edit</button>
                        <AiOutlineArrowLeft className='icon'/>
                    </div>
                </form>
            </div>
        </div>
    );
}