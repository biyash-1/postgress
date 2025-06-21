"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import React from 'react'
import { Trash2 } from 'lucide-react'
import axios from 'axios'

// Define task type
type Task = {
  id: number;
  task: string;
  isCompleted: boolean;
};

const Page = () => {
  const [inputValue, setInputValue] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]); 

  const addTask = async () => {
    if (inputValue.trim() === "") return;
    
    try {
      const response = await axios.post("/api/todos", { task: inputValue });
      
     
      setTasks([...tasks, response.data.task]);
      setInputValue("");

    } catch (error: any) {
      console.error("Error creating task:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
   
      await axios.delete(`/api/todos/${id}`);
   
      setTasks(tasks.filter(task => task.id !== id));
      
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/todos");
        console.log("data fetched is", response.data.tasks);
        
      
        setTasks(response.data.tasks);
        
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    
    fetchData();
  }, []); 

  return (
    <div className='min-h-screen flex flex-col items-center'>
      <div className="heading">
        <h1 className='pb-2 text-2xl text-red-800 mt-4'>Task tracker</h1>
      </div>
      <div className='flex gap-2 items-center'>
        <Input 
          value={inputValue} 
          placeholder="enter your tasks" 
          onChange={(e) => setInputValue(e.target.value)} 
        />
        <Button onClick={addTask}>Add tasks</Button>
      </div>
      <div>
        <div className='flex flex-col w-1/4 flex-wrap items-center justify-center mt-2 '>
          <ul className='w-[50vh] p-2 '>
            {tasks.map((task) => (
              <li 
                key={task.id} 
                className='bg-gray-300 mb-2 rounded p-2 flex gap-2 justify-between'
              >
                {task.task}
                <Trash2 
                  className="cursor-pointer" 
                  onClick={() => handleDelete(task.id)} 
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Page;