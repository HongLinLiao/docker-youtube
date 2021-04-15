import './signBack.css';
import { useSelector } from 'react-redux';
import { Jumbotron, Button } from 'react-bootstrap';
import { signInWithGoogle } from '../../service/auth';
import { useHistory } from 'react-router-dom';

export const UnSign = () => {
    return (
        <div className="d-flex justify-content-center align-items-center height-100">
            <Jumbotron className="component-container">
                <h1>Docker mini-project</h1>
                <p>
                    The website can use youtube video url to get video information by web crawler.
                    <br />
                    Please click the button to sign in with google account.
                </p>
                <p>
                    <Button variant="primary" onClick={signInWithGoogle}>Sign In</Button>
                </p>
            </Jumbotron>
        </div>
    );
}

export const InSign = () => {

    let currentUser = useSelector((state) => state.user.currentUser);

    let history = useHistory();

    const navigate = (path) => {
        history.push(path);
    }

    return (
        <div className="d-flex justify-content-center align-items-center height-100">
            <Jumbotron className="component-container">
                <h1>Docker mini-project</h1>
                <p>
                    Hi {currentUser.displayName}, please select the next step.
                </p>
                <br />
                <p className="d-flex justify-content-around">
                    <Button variant="primary" onClick={() => navigate('/add')}>Add Task</Button>
                    <Button variant="primary" onClick={() => navigate('/monitor')}>Monitor Task</Button>
                </p>
            </Jumbotron>
        </div>
    );

}
