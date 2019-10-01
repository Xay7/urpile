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

class PrivateRoute extends React.Component<any> {
  state = {
    loading: true,
    isAuthenticated: false
  };
  componentDidMount() {
    authenticate()
      .then(isAuthenticated => {
        this.setState({
          loading: false,
          isAuthenticated
        });
      })
      .catch(() => this.setState({ isAuthenticated: false }));
  }
  render() {
    const { component: Component, ...rest } = this.props;
    if (this.state.loading) {
      return <div>LOADING</div>;
    } else {
      return (
        <Route
          {...rest}
          render={props => (
            <div>
              {!this.state.isAuthenticated && (
                <Redirect to={{ pathname: "/login", state: { from: this.props.location } }} />
              )}
              <Component {...this.props} />
            </div>
          )}
        />
      );
    }
  }
}

export default PrivateRouteFunctional;
