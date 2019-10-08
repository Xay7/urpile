import React, { useState, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import axios from "axios";

const authenticate = async () => {
  try {
    await axios.get("/users/dashboard");
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
    return <div>LOADING</div>;
  } else
    return (
      <Route
        {...rest}
        render={props => (state.isAuthenticated === true ? <Component {...props} /> : <Redirect to="/login" />)}
      />
    );
};

export default PrivateRouteFunctional;
