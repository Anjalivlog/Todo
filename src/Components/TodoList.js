import React, { useEffect, useState } from 'react'
import '../Style/TodoList.css'


// to set data in local storage
const getLocalItem = () => {
    let lists = localStorage.getItem('list');
    if (lists) {
        return JSON.parse(localStorage.getItem('list'));
    } else {
        return [];
    }
}

const TodoList = () => {
    const [inputData, setInputData] = useState('');
    const [item, setItem] = useState(getLocalItem());
    const [toggleEdit, setToggleEdit] = useState(true);
    const [editData, setEditData] = useState(null);

    const addItem = () => {
        if (!inputData) {
            alert('Write something')
        } else if (inputData && !toggleEdit) {
            setItem(
                item.map((elem) => {
                    if (elem.id === editData) {
                        return {...elem, name: inputData};
                    }
                    return elem;
                })
            )
            setToggleEdit(true);
            setInputData('');
            setEditData(null);
        } else {
            const allInputData = {id: new Date().getTime().toString(), name: inputData}
            setItem([...item, allInputData]);
            setInputData('')
        }
    }

    const removeItem = (index) => {
        const updateditems = item.filter((elem) => {
            return index !== elem.id;
        });
        setItem(updateditems);
    }

    const editItem = (id) => {
        let newEditItem = item.find((elem) => {
            return elem.id === id ;
        });
        console.log(newEditItem);
        setToggleEdit(false);
        setInputData(newEditItem.name);
        setEditData(id);
    }

    const removeAll = () => {
        setItem([]);
    }

    // {add data to local storage}
    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(item))
    }, [item]);

    return (
        <>
            <div className='mainDiv'>
                <div className='subMainDiv'>
                    <figure>
                        <img src='https://cdn-icons-png.flaticon.com/512/9041/9041089.png' alt='todoimage'/>
                        <figcaption>Add Your List Here ✌</figcaption>
                    </figure>
                    <div className='addItems'>
                        <input type='text' placeholder='✍ Add Items here...' 
                         value={inputData}
                         onChange={(e) => setInputData(e.target.value)}
                        />
                        {
                            toggleEdit ?  <i className='fa fa-plus add-btn' title='Add Item' onClick={addItem} ></i> : 
                            <i className='fa fa-edit add-btn' title='update Item' onClick={addItem} ></i>
                        }
                        
                    </div>
                    <div className='showItems'>
                        {
                            item.map((elem) => {
                                return (
                                    <div className='singleItem' key={elem.id}>
                                       <h1 className='text'>{elem.name}</h1>
                                       <div className='todobtn'>
                                          <i className='far fa-edit add-btn' title='Edit Item' onClick={() => editItem(elem.id)}></i>
                                          <i className='far fa-trash-alt add-btn' title='Delete Item' onClick={() => removeItem(elem.id)}></i>
                                       </div>
                                   </div> 
                                )
                            })
                        }
                    </div>
                    {/* check all items and remove all */}
                    <div className='showItems'>
                         
                        <button className='btn effect03' onClick = {removeAll}><span> Remove All </span></button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default TodoList