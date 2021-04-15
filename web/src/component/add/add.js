import './add.css';

import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Button, Card, Accordion } from 'react-bootstrap';
import firebase from 'firebase';

import { addTask, getTaskComment } from '../../service/task';

export const TaskInfo = ({ taskKey, uid }) => {

    let history = useHistory();

    let [taskInfo, setTask] = useState(null);

    useEffect(() => {
        // add listener
        firebase.database().ref('task').child(uid).child(taskKey).on('value', (snapshot) => {
            const value = snapshot.val();
            if (value) {
                if(value.state === '已完成'){
                    getTaskComment(taskKey).then((res) => {
                        value.json = res;
                        setTask(value);
                    });
                }
                else{
                    setTask(value);
                }
            }
        });
        // remove listener
        return () => { firebase.database().ref('task').child(uid).child(taskKey).off('value') };
    }, [taskKey, uid]);

    const navigateDetail = async (taskId) => {
        history.push(`/comment/${taskId}`);
    }

    return (
        <Card className="task-card-area">
            <Card.Header>
                <Accordion.Toggle as={Card.Body} eventKey={taskKey}>
                    <span>
                        Task key: <span>{taskKey}</span> <span>{`(${taskInfo?.state})`}</span>
                    </span>
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={taskKey}>
                {
                    taskInfo
                        ?
                        <Card.Body>
                            <p>Task state:
                                <span>
                                    {taskInfo.state}
                                    {
                                        taskInfo.state === '處理中' ? ` (${taskInfo.processor})` : ''
                                    }
                                </span>
                            </p>
                            <p>Task video: <span>{taskInfo.url}</span></p>
                            <p>Task create time: <span>{new Date(taskInfo.time).toLocaleString()}</span></p>
                            {
                                taskInfo.state === '已完成'
                                    ? <div className="task-json"><span>Task JSON: <span>{taskInfo.json ?? ''}</span></span></div>
                                    : <></>
                            }
                        </Card.Body>
                        :
                        <></>
                }
            </Accordion.Collapse>
        </Card>
    )
}

const Add = () => {

    let history = useHistory();

    let [url, setUrl] = useState('');
    let [key, setKey] = useState('');

    let currentUser = useSelector((state) => state.user.currentUser);

    if (!currentUser) {
        history.push('/');
    }

    const _addTask = async () => {
        if (url) {
            const taskKey = await addTask(currentUser.uid, url);
            if(taskKey){
                setKey(taskKey);
                setUrl('');
            }
        }
        else {
            alert('Please enter a youtube video URL!');
        }
    }

    return (
        <div>
            <div className="area-add">
                <p className="add-text">Youtube Video URL</p>
                <input className="add-input" type="text" placeholder="Enter URL" value={url} onChange={e => setUrl(e.target.value)} />
                <Button variant="primary" onClick={_addTask}>Add</Button>
            </div>
            <Accordion>
                {
                    key ? (
                        <TaskInfo taskKey={key} uid={currentUser.uid} />
                    ) : (<p></p>)
                }
            </Accordion>
        </div>
    )

}

export default Add;