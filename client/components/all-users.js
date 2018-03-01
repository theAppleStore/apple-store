import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchUsers, me} from '../store'

/* COMPONENT */
class AllUsers extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.fetchUsers()
    this.props.me()
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value})
  }
  
  render(){
    const users = this.props.users.filter(user => 
      user.firstName.match(this.state.inputValue)
    )
    const {user} = this.props
    return (
      <div>
      { user.isAdmin
        ? (<div>
          <h2> All Users </h2>
          <form>
            <h3>Search: 
              <input 
                placeholder="Enter user name" 
                onChange={this.handleChange}
              />
            </h3>
          </form>
          {users.map(user => 
            (
              <div key={user.id}>
                <NavLink to={`/users/${user.id}`}> 
                  {user.firstName} {user.lastName} 
                </NavLink>
                <br></br>
              </div>
            )
          )}
        </div>)
        : (<h2> Please login first </h2>)
      }
      </div>
    )
  }

}

/* CONTAINER */
const mapState = ({users, user}) => ({users, user})
const mapProps = {fetchUsers, me}

export default connect(mapState, mapProps)(AllUsers)

/* PROP TYPES */
AllUsers.propTypes = {
  users: PropTypes.array,
  fetchUsers: PropTypes.func
}