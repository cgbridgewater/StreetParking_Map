import React, {useState} from "react";
import axios from "axios";

const ItemForm = (props) => {
    const { item, setItem } = props;
    const[ title, setTitle ] = useState("");
    const[ price, setPrice ] = useState("");
    const[ description, setDescription ] = useState("");
    const [errors, setErrors] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/item", {
            title,
            price,
            description
    })
        .then( res => {
            console.log(res);
            console.log(res.data) 
            setItem([...item, res.data])
            setTitle("")
            setPrice("")
            setDescription("")
            setErrors({})
        })
        .catch((err) => {
            console.log(err) 
                setErrors(err.response.data.errors); //Set Errors
        })
    }


    return(
        <div style={{backgroundColor:"#073DAA", minHeight:"60vh"}}>
            <h1 style={{color:"goldenrod"}}>Add New Product Into Database</h1>
            <form className="Form" style={{ fontSize:"20px", fontWeight:800,boxShadow:"0 8px 12px 0 rgba(0, 0, 0, 0.70)"}} onSubmit={onSubmitHandler}>
                <p>
                    <label>
                    { errors.title ? 
                        <h3 style={{color:"red", margin:0}}>{errors.title.message}</h3>
                        : <h3 style={{color:"#073DAA", margin:0}}>Title</h3>
                    }
                    </label>
                    <input style={{marginTop:"5px",backgroundColor:"lightgray", fontSize:"20px", fontWeight:800, border:"4px solid #073DAA", borderRadius:"15px" }} 
                    type="text" 
                    onChange={(e) => setTitle(e.target.value)}
                    value= {title}
                    />
                </p>
                <p>
                    <label>
                    { errors.price ? 
                        <h3 style={{color:"red", margin:0}}>{errors.price.message}</h3>
                        : <h3 style={{color:"#073DAA", margin:0}}>Price</h3>
                    }
                    </label>
                    <input style={{marginTop:"5px",backgroundColor:"lightgray", fontSize:"20px", fontWeight:800, border:"4px solid #073DAA", borderRadius:"15px" }} 
                    type="Number" 
                    step="0.01" 
                    min="0.01"
                    onChange={(e) => 
                    setPrice(e.target.value)}
                    value={price}
                    />
                </p>
                <p>
                    <label>
                    { errors.description ? 
                        <h3 style={{color:"red", margin:0}}>{errors.description.message}</h3>
                        : <h3 style={{color:"#073DAA", margin:0}}>Description</h3>
                    }
                    </label>
                    <textarea style={{marginTop:"5px",backgroundColor:"lightgray", fontSize:"20px", fontWeight:800, border:"4px solid #073DAA", borderRadius:"15px" }} 
                    cols="40" 
                    rows="7"  
                    onChange={(e) => setDescription(e.target.value)}
                    value= {description}
                    ></textarea>
                </p>
                <input style={{ cursor: "pointer" ,backgroundColor:"#073DAA", color:"white", padding:"8px", fontSize:"15px", fontWeight:"500",border:"1px solid white", borderRadius:"10px",boxShadow:"0 8px 12px 0 rgba(0, 0, 0, 0.70)"}} type="submit"/>
            </form>
        </div>
    )
}

export default ItemForm;