import firebase from 'firebase';

const db = firebase.database();

export const addTask = async (uid, url) => {

    const target_container = await getCorrectProcessor();

    if(!target_container){
        alert('No Processor!');
        return;
    }

    const data = {
        url,
        time: new Date().getTime(),
        state: `待處理`,
        processor: ''
    }
    const task = await db.ref('task').child(uid).push(data);
    await addPending(target_container, task.key);
    return task.key;
}

export const addPending = async (containerKey, taskKey) => {
    const data = {};
    data[taskKey] = true;
    await db.ref('pending').child(containerKey).update(data);
}

const getCorrectProcessor = async() => {

    let mapping = [];

    const container = await db.ref('processor').once('value');
    const pending = await db.ref('pending').once('value');

    let target = '';

    if(container.val()){
        Object.keys(container.val()).forEach(item => {
            if(pending.val() && pending.val()[item]){
                mapping.push({
                    container: item,
                    count: Object.keys(pending.val()[item]).length
                });
            }
            else{
                mapping.push({
                    container: item,
                    count: 0
                });
            }
        });
        mapping.sort((a,b) => { return a.count - b.count});
        target = mapping[0].container;
    }

    return target;

}

export const getUserTask = async (uid) => {
    const snapshot = await db.ref('task').child(uid).once('value');
    return snapshot.val();
}

export const getTaskComment = async (taskId) => {
    const data = await firebase.storage().ref(`output/${taskId}`).child('output.json').getDownloadURL();
    return data;
}