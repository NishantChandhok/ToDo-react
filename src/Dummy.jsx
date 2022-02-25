import React, { useState } from 'react'
import {v4 as uuid} from 'uuid'
import icon from './images/icon.png'
import './Todo.css';



const Todo = () => {

    const unique_id = uuid();
    const small_id = unique_id.slice(0,8);
    const [toggle,setToggle] = useState(false);
    const[data,setData] = useState([]);
    const [editIemId, setEditItemId] = useState(null);
    const[inputData,setInputData] = useState('');

    
    const handleChange = (e) =>{

        setInputData(e.target.value);
    }

    const addItem = () =>{

        if(inputData === ''){
            alert('Enter Something');
        }
        else if(inputData && toggle){

            setData(

                data.map((ele)=>{
                    if(ele.id === editIemId){
                        return {...ele,description:inputData}
                    }
                    return ele;
                })
            )
            setToggle(false);
        }
        else {
        setData([...data,{
            id : small_id,
            description : inputData
        }]);
    
        }
        setInputData('');
    }

    const handleEdit = (id) =>{
        setToggle(true);
        setEditItemId(id);
        const previousValue = data.find(ele=>ele.id == id);

        setInputData(previousValue.description);

    }
 

    const deleteItem = (id) =>{
        
        const dataAfterDeletion = data.filter((ele)=>{
            return id !== ele.id
        })
        setData(dataAfterDeletion)
    }
    const deleteAll = () => {
        setData([]);
    }
 
    return (
    <div className="Todo">
        <div style={{textAlign : "center",paddingTop : "5%"}}>
            <h1>GeekHouse TODO &#128640;</h1>
        </div>
        <div className="parent_div">
            <div className="child_div">
                <div className="inputSection">
                    <img src={icon} alt="icon" />
                    <br />
                    <br />
                    <input type="text" placeholder='Enter your TODO' onChange={handleChange} value={inputData} />
                    {

                        (toggle === false) ? (
                            <button className="addBtn" onClick={addItem}><i className="fa fa-plus"></i></button>
                        ) : (<button className ="inputEdit" onClick={addItem} ><i className="fa fa-edit"></i></button>)

                    }
                    
                    
                    

                </div>
                <br />
                

                <div className="listItems">
                    {
                        data.map((ele)=>{
                            return (
                                <div key={ele.id} className="eachItem">
                                    <span>{ele.description}</span>
                                    <button className='deleteBtn'  onClick={()=> deleteItem(ele.id)}  ><i className='fa fa-trash'></i></button>
                                    <button className='editBtn' onClick={()=>handleEdit(ele.id)} ><i className='fa fa-edit'></i></button>
                                </div>
                            )
                        })
}
                    <button onClick={deleteAll}>Delete All</button>
                </div> 
            </div>
        </div>
        
    </div>
  )
}

export default Todo;

