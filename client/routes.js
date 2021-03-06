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
import SingleApple from "./components/singleapple"
import Cart from './components/cart'
import { AdminHome } from './components/admin-home'
import EditApple from "./components/edit-apple";
import Checkout from './components/checkout';
import NewReviewForm from './components/newreviewform'
import AddApple from './components/add-apple'
import ReviewCart from './components/review-cart'
import ThankYou from './components/thank-you'

/**
 *  COMPONENT
 */

class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    const { isLoggedIn, isAdmin, userId, user } = this.props;

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        {/* If you only want to match '/roster', then you need to use
the "exact" prop. The following will match '/roster', but not '/roster/2'.
<Route exact path='/roster'/>*/}
        <Route exact path="/" component={VisitorHome} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/thank-you" component={ThankYou} />
        <Route exact path="/apples/edit" component={AddApple} />
        <Route exact path="/apples/type/:category" component={AllApples} />
        <Route exact path="/apples/:id" component={SingleApple} />
        <Route exact path="/apples/:id/review" component={NewReviewForm}/>
        <Route path="/apples/:id/edit" component={EditApple} />
        <Route exact path="/apples" component={AllApples} />
        <Route path="/apples/type/:category" component={AllApples} />
        <Route exact path="/users" component={AllUsers} />
        <Route path="/users/:id/edit" component={EditProfile} />
        <Route path="/users/:id" component={SingleUser} />
        <Route exact path="/orders" component={AllOrders} />
        <Route path="/cart" component={Cart} />
        <Route path="/orders/single/:id" component={SingleOrder} />
        <Route exact path="/orders/:userId" component={AllOrders} />
        <Route exact path="/reviewcart" component={ReviewCart} />

        {isLoggedIn &&
          !isAdmin && (
            <Switch>
              {/* Routes placed here are only available after logging in */}
              <Route path="/" component={UserHome} />
            </Switch>
          )}

        {isLoggedIn &&
          isAdmin && (
            <Switch>
              {/* Routes placed here are only available for Admin*/}
              <Route path="/:userId" component={AdminHome} />
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
    isAdmin: !!state.user.isAdmin,
    userId: state.user.id,
    user: state.user
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
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
};
