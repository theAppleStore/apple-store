import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchUsers} from '../store'

/* COMPONENT */
class AllUsers extends Component {
  constructor(props){
    super(props)
    this.state = {
      inputValue: '',
      users: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount(){
    this.props.fetchUsers()
  }

  handleChange(event) {
    this.setState({inputValue: event.target.value})
    console.log(this.state.inputValue)
  }
  
  render(){
    // const {users} = this.props
    const users = this.props.users.filter(user => 
      user.firstName.match(this.state.inputValue)
    )
    return (
      <div>
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
      </div>
    )
  }

}

/* CONTAINER */
const mapState = (state) => {
  console.log(state)
  return {users: state.users}
}
const mapProps = {fetchUsers}

export default connect(mapState, mapProps)(AllUsers)

/* PROP TYPES */
AllUsers.propTypes = {
  users: PropTypes.array,
  fetchUsers: PropTypes.func
}