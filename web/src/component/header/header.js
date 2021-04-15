import './header.css';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, DropdownButton, ButtonGroup, Dropdown } from 'react-bootstrap';
import { ReactComponent as Youtube } from '../../assets/svg/youtube.svg';

import { signInWithGoogle, signOut } from '../../service/auth';

const UserAction = ({ currentUser }) => {

    let history = useHistory();

    const navigate = (path) => {
        history.push(path);
    }

    const signOutPage = async() => {
        await signOut();
        navigate('/');
    }

    return (
        <div>
            <img src={currentUser.photoURL} className="user-photo" alt={currentUser.displayName}/>
            <DropdownButton
                as={ButtonGroup}
                key={`dropdown-user`}
                id={`dropdown-variants-Info`}
                variant={`info`}
                title={currentUser.displayName}
            >
                <Dropdown.Item onClick={() => navigate(`/add`)}>Add Task</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate(`/monitor`)}>Monitor Task</Dropdown.Item>

                <Dropdown.Divider />
                <Dropdown.Item onClick={signOutPage}>Sign Out</Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

const Header = () => {

    const currentUser = useSelector((state) => state.user.currentUser);

    let history = useHistory();

    const navigate = (path) => {
        history.push(path);
    }

    return (
        <div className="header-container d-flex align-items-center justify-content-between">

            <div>
                <Youtube className="youtube-icon pointer" onClick={() => navigate(`/`)} />
            </div>

            {
                currentUser
                    ?
                    <UserAction currentUser={currentUser} />
                    :
                    <div>
                        <Button variant="outline-light" onClick={signInWithGoogle}>Sign In</Button>
                    </div>
            }

        </div>
    )
};

export default Header;
