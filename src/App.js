import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import { useToastContext, ADD, REMOVE_ALL } from './contexts/ToastContext';

export const Home = () => {
  const { toastDispatch } = useToastContext();
  return (
    <div>
      <button
        onClick={() =>
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: 'OK', message: 'Hello World' }
            }
          })
        }
      >
        Show basic notification
      </button>
    </div>
  );
};
export const Info = () => {
  const { toastDispatch } = useToastContext();
  return (
    <div>
      <button
        onClick={() =>
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: 'OK', message: 'Info message' },
              type: 'info'
            }
          })
        }
      >
        Show Info notification
      </button>
    </div>
  );
};

export const Danger = () => {
  const { toastDispatch } = useToastContext();
  return (
    <div>
      <button
        onClick={() =>
          toastDispatch({
            type: ADD,
            payload: {
              content: { sucess: 'FAIL', message: 'Something nasty!' },
              type: 'danger'
            }
          })
        }
      >
        Show danger notification
      </button>
    </div>
  );
};

export const CutomHTML = () => {
  const { toastDispatch } = useToastContext();
  return (
    <div>
      <button
        onClick={() =>
          toastDispatch({
            type: ADD,
            payload: {
              content: () => {
                return (
                  <div>
                    <h4>Error</h4>
                    <p>Something nasty happened!!</p>
                  </div>
                );
              },
              type: 'danger'
            }
          })
        }
      >
        Show danger notification with custom HTML
      </button>
    </div>
  );
};

export default function App() {
  const { toast, toastDispatch } = useToastContext();
  function showClearAll() {
    if (toast.length) {
      return (
        <button
          onClick={() =>
            toastDispatch({
              type: REMOVE_ALL
            })
          }
        >
          Clear all notifications
        </button>
      );
    }
  }
  return (
    <div className="App">
      <Router>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/info">Info</Link>
          </li>
          <li>
            <Link to="/danger">Danger</Link>
          </li>
          <li>
            <Link to="/custom-html">Custom HTML</Link>
          </li>
        </ul>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/info">
            <Info />
          </Route>
          <Route exact path="/danger">
            <Danger />
          </Route>
          <Route exact path="/custom-html">
            <CutomHTML />
          </Route>
        </Switch>
      </Router>
      <br />
      {showClearAll()}
    </div>
  );
}
