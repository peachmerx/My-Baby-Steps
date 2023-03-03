import React, { useState, useEffect } from 'react';
import Todo from './ToDo';
import { db } from './firebase';
import {
    query,
    collection,
    onSnapshot,
    updateDoc,
    doc,
    addDoc,
    deleteDoc,
} from 'firebase/firestore';

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [input, setInput] = useState('');

    // Create todo
    const createTodo = async (e) => {
        e.preventDefault(e);
        if (input === '') {
            alert('Please enter a valid todo');
            return;
        }
        await addDoc(collection(db, 'todos'), {
            text: input,
            completed: false,
        });
        setInput('');
    };

    // Read todo from firebase
    useEffect(() => {
        const q = query(collection(db, 'todos'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
                todosArr.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todosArr);
        });
        return () => unsubscribe();
    }, []);

    // Update todo in firebase
    const toggleComplete = async (todo) => {
        await updateDoc(doc(db, 'todos', todo.id), {
            completed: !todo.completed,
        });
    };

    // Delete todo
    const deleteTodo = async (id) => {
        await deleteDoc(doc(db, 'todos', id));
    };

    return (
        <div className='popup-to-do'>
            <div className='pupup-content-to-do'>
                <button className="close" onClick={toggleToDo}>
                    X
                </button>
                <h3>To Do List</h3>
                <form onSubmit={createTodo}>
                    <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        type='text'
                        placeholder='Add Todo'
                    />
                    <button type='submit'>
                        Add
                    </button>
                </form>
                <ul>
                    {todos.map((todo, index) => (
                        <Todo
                            key={index}
                            todo={todo}
                            toggleComplete={toggleComplete}
                            deleteTodo={deleteTodo}
                        />
                    ))}
                </ul>
                {todos.length < 1 ? null : (
                    <p>{`You have ${todos.length} todos`}</p>
                )}
            </div>
        </div>
    );
}

export default TodoList;
