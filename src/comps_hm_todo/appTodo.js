import React, { useEffect } from 'react';
import TaskInput from './taskInput';
import TaskList from './taskList';

function AppToDo (props){
    let [task_ar, setTasks] = useState ([
        { name: "learn wordpress", date:"2021/04/02", id:1},
        { name: "learn PHP", date:"2021/04/05", id:2}
    ]);

useEffect(() => {
    if (localStorage["tasks"] ) {
        setTasks (JSON.parse(localStorage["tasks"]));
    }
})

   const delAllTask = () => {
        setTask([]);
    }

    
   const delSingleTask = () => {
    alert(_id);
}



    return(
    // <React.Fragment>
    //     <TaskInput setTask={setTask} task_ar={task_ar}/>
    //     <TaskList task_ar={task_ar} delSingleTask={delSingleTask}  delAllTask={delAllTask}/>
    // </React.Fragment>
    )
}

export default AppToDo 