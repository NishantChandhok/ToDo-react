import React, { useState, useRef } from "react";
import image from './images/icon.png';
import './Todo.css';
import { v4 as uuid } from 'uuid';



const Todo = () => {
    const inputRef = useRef();
    const [truth, setTruth] = useState(true);
    const unique_id = uuid();
    const small_id = unique_id.slice(0, 6);
    const [data, setData] = useState([]);
    const [input, setInput] = useState('')
    const [eid, set_eid] = useState(null);
    const [Checked, setChecked] = useState(false);
    const inputChange = (element) => {
        setInput(element.target.value);

    }
    const addData = () => {
        if (input === '') {
            alert('Enter Something');
        }
        else {
            setData([...data, { id: small_id, name: input, select: false }]);
        }
        setInput('');
        inputRef.current.focus();
    }
    const deleteData = (id) => {

        const afterDelete = data.filter(
            (element) => { return id !== element.id }
        )

        setData(afterDelete);
        inputRef.current.focus();

    }
    const deleteAll = () => {
        setData([]);
        setInput('');
        inputRef.current.focus();
    }
    const deleteSelection = () => {
        const afterDelete = data.filter(
            (element) => { return element.select === false }
        )

        setData(afterDelete);
        setChecked(false);
        inputRef.current.focus();

    }
    const editData1 = (element) => {
        setTruth(false);
        setInput(element.name);
        set_eid(element.id);
        inputRef.current.focus();

    }
    const editData2 = () => {
        if (input === '') {
            alert('Enter Something');
        }
        setData(
            data.map(
                (e) => {
                    if (e.id === eid) {
                        return { ...e, name: input }
                    }
                    return e;
                }
            )
        )
        setTruth(true);
        setInput('');
        inputRef.current.focus();
    }

    const keyEnter = (e) => {
        if (e.key === 'Enter' && truth) {
            addData();
        }
        else if (e.key === 'Enter' && !truth) {
            editData2();
        }
    }
    const checkBox = (e) => {

        setData(
            data.map((element) => {
                if (e.id === element.id) {
                    if (element.select === false) {
                        return { ...element, select: true };
                    }
                    else {
                        return { ...element, select: false };
                    }

                }
                return element;
            }
            )
        )
    }
    const handleCheckedAll = () => {

        if (Checked) {
            setChecked(false);
        }
        else {
            setChecked(true);
        }

        setData(
            data.map((e) => {
                return { ...e, select: !Checked };

            })
        )

    }
    return (
        <section className="all">
            <h1>Todo List &#128221;</h1>
            <div className="header">

                <img src={image} alt="todo logo" /><br />
                {
                    (data.length === 0) ? (<></>) :
                        (<input type="checkbox" className="checkAll" onClick={handleCheckedAll} checked={Checked}></input>)

                }
                <input ref={inputRef} type="text" name="input" placeholder="Enter Here" id="input" value={input} onChange={inputChange} autoComplete="off" onKeyPress={keyEnter} />
                {(truth) ?
                    (<button onClick={addData} className="Button"><i className="fa fa-plus"></i></button>) :
                    (<button onClick={editData2} className="Button"><i className="fa fa-edit"></i></button>)
                }
            </div>
            <div className="editarea">
                {
                    data.map((element) => {
                        return (
                            <div className="area">

                                <div className="check"> <input type="checkbox" id="checkBox" onClick={() => checkBox(element)} checked={element.select}></input></div>
                                <div className="individual">
                                    <div className="ind_text">{element.name}</div>
                                    <div className="indideButtons">

                                        <button onClick={() => editData1(element)} className="insideButton" title='Edit'><i className="fa fa-edit"></i></button>
                                        <button onClick={() => deleteData(element.id)} className="insideButton" title='Delete   '><i className="fa fa-trash"></i></button>
                                    </div>

                                </div>
                            </div>

                        )
                    })
                }
                < br />
                <div className="deleteAll">
                    {
                        (data.length === 0) ? (<></>) :
                            (<button onClick={deleteSelection} id="deleteAll" title='Delete'>
                                <span className="icon"><i className="fa fa-trash" ></i></span>
                                <span className="txt">Delete</span></button>)

                    }
                </div>

            </div>



        </section >
    )

}
export default Todo;
