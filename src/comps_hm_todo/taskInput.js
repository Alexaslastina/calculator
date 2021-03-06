import React, { useRef } from 'react';

function TaskInput(props){
  let nameRef = useRef();
  let dateRef = useRef();

  const addTaskFromInputs = () => {
    let task = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      id: Date.now()
    }
    props.addTask(task)
  }

  return(
    <div className="container text-center">
      <div className="col-lg-6 border p-2 mx-auto">
        <h2>Reminder hooks pro:</h2>
        <div className="d-flex my-3">
          <input placeholder="enter task..." ref={nameRef} type="text" className="form-control" />
          <input ref={dateRef} type="date" className="form-control" />
          <button onClick={addTaskFromInputs} className="btn btn-success w-50">Add task</button>
        </div>
      </div>
    </div> 
  )
}

export default TaskInput
