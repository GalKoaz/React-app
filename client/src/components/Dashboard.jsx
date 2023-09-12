import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Item from './Item';
import './Dashboard.css';

export default function Dashboard(props) {

    const [userInput,setUserInput] = useState('');
    const [todoList,setTodoList] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [edit, setEdit] = useState(false);
    const [editText, setEditText] = useState('');
    const [textID, setTextID] = useState('');

    const navigate = useNavigate();


    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch('http://localhost:3000/dashboard', {
                method: 'GET',
                credentials: 'include',
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAuthenticated(true);
            setUserData(data.user.email.split('@')[0]);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        };
        fetchUserData();    
        
        const fetchTodoList = async () => {
            try {
                const response = await fetch('http://localhost:3000/getList', {
                    method: 'GET',
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setTodoList(data.todo.map((item) => item.text));
            } catch (error) {
                console.error(error);
            }
        };
        fetchTodoList();

      }, [setTodoList]);



      

    const handleLogout = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/logout', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
            });
            if (response.ok) {
                console.log('Logout successful');
                toast.success("Logout successful");
                setAuthenticated(false);
                props.onLogout(false);
                navigate('/login');
            } else {
                console.error('Logout failed');
                response.json().then((data) => toast.error(data.error));
            }
        } catch (error) {
            console.error('Error:', error);
            toast.error('Error: ' + error);
        }
    };

    const handleInput = (event) => {
        setUserInput(event.target.value);
    };


    const handleAdd = async (event) => {
        setTodoList([...todoList,userInput]);
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/add', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text:userInput }),
                credentials: 'include',
            });
            if (response.ok) {
                setUserInput('');
            } else {
                console.error('Task not Added');
                setUserInput('');
                response.json().then((data) => toast.error(data.error));
            }
        } catch (error) {
            console.error(error);
        }
    };


    const removeItem = async (id) => {
        const item = todoList[id];
        try {
            const response = await fetch('http://localhost:3000/delete', {
                method: 'DELETE',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text:item }),
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Task Deleted');
                setTodoList((prevValue)=>{
                    return prevValue.filter((item,index)=>{
                        return index !== id;
                    });
                });
            } else {
                console.error('Task not Deleted');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const handleEdit = (event) => {
        setEditText(event.target.value);
    };

    const editItem = async (id) => {
        setEdit(true);
        setTextID(id);
    };

    async function editItemHandler(){

        try {
            const response = await fetch('http://localhost:3000/edit', {
              method: 'PUT',
              headers: {
                'Content-Type': 'application/json',
              },
              credentials: 'include', // Move this line out of the headers object
              body: JSON.stringify({ text: todoList[textID], editText: editText }),
            });
            if (response.ok) {
              console.log('Task Edited');
            } else {
              console.error('Task not Edited');
            }
          } catch (error) {
            console.error(error);
          }          
        todoList[textID] = editText;
        setEdit(false);
        setEditText('');
        setTextID('');
    }


    return ({authenticated} ?
        <>
        <div className="dashboard">
            <h1>Welcome {userData}</h1>
        </div>
        {!edit && <div className="input-container">
            <input type="text" placeholder="Enter your task" onChange={handleInput} value={userInput}/>
            <button className="buttonInput"onClick={handleAdd}>Add</button>
        </div>}
        <div className="task-list">
            <ul>
            {!edit ? <> {todoList.map((item,index)=>{
                    return(
                        <Item key={index} id={index} item={item} onChecked={removeItem} onChecked2={editItem}/>
                    )
                })}</> : 
                <>
                <div className="input-container">
                <input type="text" placeholder={todoList[textID]} onChange={handleEdit} value={editText}/>
                <button className="buttonInput" onClick={editItemHandler}>Update</button>
                </div>
                </>}
            </ul>
        </div>
        <div className="logout-container">
            <button onClick={handleLogout}>Logout</button>
        </div>
        </>
        :
        navigate('/login')
    );
}

