import React, { useState } from 'react';
import { AwesomeButton, AwesomeButtonProgress } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import Modal from "../shared/UIElements/Modal";
import { addTodo, completeTodo, deleteBoard, deleteTodo1, deleteTodo2 } from '../features/boardSlice';
import { useDispatch } from 'react-redux';
import './styles/singleBoard.css';
import InputArea from '../todoList/InputArea';


const SingleBoard = (props) => {
    const [openBox, setOpenBox] = useState(false);
    const toggleBoard = () => setOpenBox(prev => !prev);
    const [inputText, setInputText] = useState("");
    const dispatch = useDispatch();
    const handleTodo = (event) => {
        const newTask = event.target.value;
        setInputText(newTask);
    }

    const handleChange = (event) => {
        dispatch(completeTodo({
            taskName: event.target.name,
            boardID: props.id,
        }));
    }
    const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const addTask = () => {
        dispatch(addTodo({
            boardID: props.id,
            taskName: inputText,
        }));
        setInputText("");
    }
    return (
        <React.Fragment>
            <Modal
                show={openBox}
                closeBox={toggleBoard}
                header={
                    <span>
                        <div className='details'>
                            <p><b>{props.name}</b></p>
                            <b><em>{props.date}</em></b>
                        </div>
                        <div className='newtodo'>
                            <InputArea
                                addItem={addTask}
                                onChecked={handleTodo}
                                inputText={inputText}
                                placeholder="Add new Todo !"
                                btn="+"
                            />
                        </div>
                    </span>
                }
                footer={
                    <span>
                        <AwesomeButtonProgress type="secondary"
                            onPress={async (element, next) => {
                                await delay(700);
                                dispatch(deleteBoard({ id: props.id }));
                                next();
                                await delay(500);
                                toggleBoard();
                            }}>
                            DELETE
                        </AwesomeButtonProgress>
                        <AwesomeButton type="danger"
                            onPress={toggleBoard}>
                            CLOSE
                        </AwesomeButton>
                    </span>
                }
            >
                <section className='alltasks'>
                    <div className='done'>
                        <h2 className='font-semibold text-sm'>New Tasks</h2>
                        {props.remTasks.map((x, index) =>
                            <section className='taskRow'>
                                <label htmlFor={x}>
                                    <b><em>{x}</em></b>
                                </label>
                                <input type='checkbox' id={x} name={x} onChange={handleChange} />
                                <span className="material-symbols-outlined"
                                    onClick={() => {
                                        dispatch(deleteTodo1({
                                            taskID: index,
                                            boardID: props.id,
                                        }))
                                    }}
                                >
                                    close
                                </span>
                            </section>
                        )}
                    </div>
                    <div className='notDone'>
                        <h2 className='font-semibold text-sm'>Completed Tasks</h2>
                        {props.doneTasks.map((x, index) =>
                            <section className='taskRow'>
                                <label>
                                    <b><em>{x}</em></b>
                                </label>
                                <span
                                    className="material-symbols-outlined"
                                    onClick={() => {
                                        dispatch(deleteTodo2({
                                            taskID: index,
                                            boardID: props.id,
                                        }))
                                    }}
                                >
                                    close
                                </span>
                            </section>
                        )}

                    </div>
                </section>
            </Modal>

            <div className="bg-white max-w-60 rounded-lg shadow-md shadow-black/60 text-base p-2.5 m-4"
                onClick={toggleBoard}>
                <h1 className='font-semibold font-family:segue-ui'>
                    {props.name}
                </h1>
                <span className="material-symbols-outlined"
                    onClick={() => {
                        dispatch(deleteBoard({ id: props.id, }))
                    }}
                >
                    close
                </span>
            </div>
        </React.Fragment>
    )
}
export default SingleBoard;