import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import Item from './Item';

export default function Dashboard() {

    const [userInput,setUserInput] = useState('');
    const [todoList,setTodoList] = useState([]);
    const [authenticated, setAuthenticated] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);


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
                method: 'POST',
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



    return ({authenticated} ?
        <>
        <div>
            <h1>Welcome {userData}</h1>
        </div>
        <div>
            <input type="text" placeholder="Enter your task" onChange={handleInput} value={userInput}/>
            <button onClick={handleAdd}>Add</button>
        </div>
        <div>
            <ul>
                {todoList.map((item,index)=>{
                    return(
                        <Item key={index} id={index} item={item} onChecked={removeItem}/>
                    )
                })} 
            </ul>
        </div>
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
        </>
        :
        navigate('/login')
    );
}

