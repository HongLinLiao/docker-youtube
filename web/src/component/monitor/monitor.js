import './monitor.css'
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Accordion } from 'react-bootstrap';
import { TaskInfo } from '../add/add';

const Monitor = () => {

    let history = useHistory();

    let currentUser = useSelector((state) => state.user.currentUser);

    if (!currentUser || !currentUser.uid) {
        history.push('/');
    }

    let [taskList, seTaskList] = useState({});

    useEffect(() => {
        const db = firebase.database();
        db.ref('task').child(currentUser.uid).on('value', (snapshot) => {
            if(snapshot.val()){
                seTaskList(snapshot.val());
            }
            else{
                seTaskList({});
            }
        });
        return () => db.ref('task').child(currentUser.uid).off('value');

    },[currentUser]);

    
    return (
        <Accordion>
            {
                Object.keys(taskList).length > 0 
                ? Object.keys(taskList).reverse().map((taskKey) => <TaskInfo taskKey={taskKey} uid={currentUser.uid} key={taskKey}/>)
                : <h2 className="no-task-text">No any task exist, try to add a task!</h2>
            }
        </Accordion>
    )

}

export default Monitor;