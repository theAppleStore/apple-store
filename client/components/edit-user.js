import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'

import store, {fetchUser} from '../store'

/* COMPONENT */
class EditProfile extends Component {
  constructor(props){
    super(props)
  }

  componentDidMount(){
    const {id} = this.props.match.params
    this.props.fetchUser(id)
  }

  render(){
    const {user} = this.props
    return (
      <div>
        <h2> Edit Profile </h2>
        {user.firstName}
        <form>

        </form>
      </div>
    )
  }
}

/* CONTAINER */


/* PROP TYPES */
const mapState = ({userProfile}) => ({user: userProfile})
const mapProps = {fetchUser}

export default connect(mapState, mapProps)(EditProfile)