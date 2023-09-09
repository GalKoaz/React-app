import React,{useState,useEffect} from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Dashboard() {

    const [userInput,setUserInput] = useState('');
    const [todoList,setTodoList] = useState([]);


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


    return (
        <>
        <div>
            <h1>Dashboard</h1>
        </div>
        <div>
            <input type="text" placeholder="Enter your task" onChange={(e)=>setUserInput(e.target.value)} value={userInput}/>
            <button onClick={()=>setTodoList([...todoList,userInput])}>Add</button>
        </div>
        <div>
            <ul>
                {todoList.map((item)=>{
                    return(
                        <li key={item.id}>{item}</li>
                    )
                })} 
            </ul>
            {/* <h1>{JSON.stringify({userId: user.id})}</h1> */}
        </div>
        </>
    );
}

