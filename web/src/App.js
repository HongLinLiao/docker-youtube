import './App.css';
import './firebase';
import firebase from 'firebase';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentUser } from './reducer/user';

import Add from './component/add/add';
import Monitor from './component/monitor/monitor';
import { InSign, UnSign } from './component/signBack/signBack';
import Header from './component/header/header';

function App() {

  let dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          email: firebaseUser.email,
          photoURL: firebaseUser.photoURL,
          uid: firebaseUser.uid
        };
        if (JSON.stringify(user) !== JSON.stringify(currentUser)) {
          dispatch(setCurrentUser(user));
        }
      }
      else {
        dispatch(setCurrentUser(null));
      }
    });
  });

  let currentUser = useSelector((state) => state.user.currentUser);

  return (
    <Router>
      <div className="app-container">
        <Header />
        <div className="app-body height-85">
          <Switch>
            <Route path="/add" component={Add} />
            <Route path="/monitor" component={Monitor} />
            <Route path="/">
              {
                currentUser ? <InSign /> : <UnSign />
              }
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
