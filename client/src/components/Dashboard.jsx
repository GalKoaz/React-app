import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

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
                credentials: 'include', // Send cookies with the request
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAuthenticated(true);
            setUserData(data.user);
            console.log(data.user.email);
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);
      

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
                body: JSON.stringify({ userInput }),
                credentials: 'include',
            });
            if (response.ok) {
                console.log('Task Added');
                setUserInput('');
                toast.success("Task Added");
            } else {
                console.error('Task not Added');
                setUserInput('');
                response.json().then((data) => toast.error(data.error));
            }
        } catch (error) {
            console.error(error);
            toast.error("Task not Added");
        }
    };


    // const handleSubmit = async (event) => {
    //     event.preventDefault();
    //     try {
    //         const response = await fetch('http://localhost:3000/add', {
    //             method: 'POST',
    //             headers: {
    //             'Content-Type': 'application/json',
    //             },
    //             body: JSON.stringify({ task:userInput }),
    //         });
    //         if (response.ok) {
    //             console.log('Task Added');
    //             setUserInput('');
    //             toast.success("Task Added");
    //         } else {
    //             console.error('Task not Added');
    //             setUserInput('');
    //             response.json().then((data) => toast.error(data.error));
    //         }
    //     } catch (error) {
    //         console.error(error);
    //         toast.error("Task not Added");
    //     }
    // };


    return ({authenticated} ?
        <>
        <div>
            <h1>Dashboard</h1>
            <h2>Welcome {userData}</h2>
        </div>
        <div>
            <input type="text" placeholder="Enter your task" onChange={handleInput} value={userInput}/>
            <button onClick={handleAdd}>Add</button>
        </div>
        <div>
            <ul>
                {todoList.map((item,index)=>{
                    return(
                        <li key={index}>{item}</li>
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

