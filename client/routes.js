import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome, VisitorHome} from './components'
import {me} from './store'
import AllApples from './components/allapples'
import SingleUser from './components/single-user'
import SingleOrder from './components/single-order'
import AllUsers from './components/all-users'
import EditProfile from './components/edit-user'
import AllOrders from './components/all-orders'
import SingleApple from "./components/singleapple";

/**
 * COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path="/" component={VisitorHome} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/apples/type/:category" component={AllApples} />
        <Route path="/apples/:id" component = {SingleApple}/>
        <Route path= "/apples" component={AllApples}/>
        <Route exact path="/users" component={AllUsers} />
        <Route path = "/users/:id/edit" component = { EditProfile } />
        <Route path="/users/:id" component={SingleUser} />
        <Route exact path="/orders" component={AllOrders} />
        <Route path="/orders/:id" component={SingleOrder} />

        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/" component={UserHome} />
          </Switch>
        )}

        {isAdmin && (
          <Switch>
            {/* Routes placed here are only available for Admin*/}
            <Route path="/adminhome" component={AdminHome} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  };
};

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
