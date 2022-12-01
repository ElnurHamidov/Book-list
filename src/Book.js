import { AiOutlineEdit ,AiOutlineDelete } from "react-icons/ai";
import { useContext } from "react";
import Context from "./Context";
import {Link} from 'react-router-dom';

export default function Book(props){

    const obj = useContext(Context);

    return(
        <div className="book">
            <div>
                <h2>{props.value.name}</h2>
                <p><strong>Author :</strong> {props.value.author}</p>
                <p><strong>Pages:</strong>{props.value.page}</p>
                <p><strong>Price:</strong>{props.value.price}</p>
            </div>
            <div>
                <Link to="/edit"><AiOutlineEdit className="icon" onClick={()=>obj.onEdit(props.value)}/></Link>
                <AiOutlineDelete className="icon" onClick={()=>{
                    const confirm=window.confirm('Remove book?');
                     if(confirm) obj.onDelete(props.value.id);
                    }}/>
            </div>
        </div>
    );
}