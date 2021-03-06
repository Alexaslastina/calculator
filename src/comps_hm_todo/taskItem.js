import React, { useEffect, useState } from 'react';

function TaskItem(props){
    let [days, setDays] = useState(0);
    let item = props.item;

    useEffect (() => {
        let time= Date.parse(item.date) - Date.now();
        let daysLeft = Math.floor(time/ (1000*60*60*24));
        setDays(daysLeft);
    }, [])

    const delTask = () => {
        if (window.confirm("Are you sure?")){
            props.delSingleTask(item.id)
        }
    }

    return(
        <div className="border p-2"> 
<button onClick={delTask}> </button>
        </div>
    )
}

export default TaskItem