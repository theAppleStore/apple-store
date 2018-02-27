import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import store, {fetchApples} from '../store'
import AppleItem from './appleitem'

class AllApples extends React.Component {
  constructor(props){
      super(props);
  }
  componentDidMount(){
    console.log("HI")
    this.props.mountApples();
  }
  render () {
    console.log(this.props);
    return (
      <div>
        <h1>All Apples</h1>
         
        <ul className = 'apple-list'>
        {this.props.apples.map(apple => (
           <ul key={apple.id}>
            <AppleItem apple = {apple}/>
           </ul>
         )
        )
      }
         </ul>
      </div>
    )
  }
}

const mapStateToProps = function(state){
  console.log(state)
  return {
    apples: state.apples
  }
}

const mapDispatchToProps = function(dispatch){
  return {
    mountApples: function(){
     dispatch(
        fetchApples()
      )
    }
  }
}

const AllApplesContainer = connect(mapStateToProps, mapDispatchToProps)(AllApples)
export default AllApplesContainer
