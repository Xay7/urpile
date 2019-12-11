import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../Loader/Loader';
const authenticate = async () => {
  try {
    const res = await axios.get('/users/dashboard');
    if (localStorage.getItem('uid') === null) {
      localStorage.setItem('uid', res.data.id);
    }
    return true;
  } catch {
    return false;
  }
};

// Use redux for auth
const PrivateRouteFunctional: React.FC<any> = ({ component: Component, ...rest }) => {
  const [state, setState] = useState({
    loading: true,
    isAuthenticated: false
  });
  useEffect(() => {
    if (!state.isAuthenticated) {
    }
    authenticate()
      .then(isAuthenticated => {
        setState({
          loading: false,
          isAuthenticated
        });
      })
      .catch(() => setState({ ...state, isAuthenticated: false, loading: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (state.loading) {
    return (
      <div style={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Loader></Loader>
      </div>
    );
  } else
    return <Route {...rest} render={props => (state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)} />;
};

export default PrivateRouteFunctional;
