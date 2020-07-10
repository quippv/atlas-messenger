import React, { useEffect, Suspense } from "react";
import { Switch, Route, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./hoc/Layout/Layout";
import Home from "./components/UI/Home/Home";
import Logout from "./containers/Auth/Logout/Logout";
import * as actions from "./store/actions/index";

const ChatsContainer = React.lazy(() => {
  return import("./containers/ChatsContainer/ChatsContainer");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const App = (props) => {
  const { onAutoCheck } = props;

  useEffect(() => {
    onAutoCheck();
  }, [onAutoCheck]);

  let routes = (
    <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
      <Switch>
        <Route path="/auth" exact render={(props) => <Auth {...props} />} />
        <Redirect to="/auth" />
      </Switch>
    </Suspense>
  );

  if (props.isAuthenticated) {
    routes = (
      <Layout>
        <Suspense fallback={<p style={{ textAlign: "center" }}>Loading...</p>}>
          <Switch>
            <Route
              path={
                localStorage.getItem("userIdFriend") !== "undefined"
                  ? `/chats/${localStorage.getItem("userIdFriend")}`
                  : "/chats"
              }
              render={(props) => <ChatsContainer {...props} />}
            />
            <Route path="/logout" component={Logout} />
            <Route path="/" exact component={Home} />
            <Redirect
              to={
                localStorage.getItem("userIdFriend") !== "undefined"
                  ? `/chats/${localStorage.getItem("userIdFriend")}`
                  : "/"
              }
            />
          </Switch>
        </Suspense>
      </Layout>
    );
  }

  return <div className="App">{routes}</div>;
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAutoCheck: () => dispatch(actions.checkAutoState()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
