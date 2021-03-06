/* global describe beforeEach it */

// import {expect} from 'chai'
// import React from 'react'
// import enzyme, {shallow} from 'enzyme'
// import Adapter from 'enzyme-adapter-react-16'
// import {UserHome} from './user-home'

// const adapter = new Adapter()
// enzyme.configure({adapter})

// describe('UserHome', () => {
//   let userHome

//   beforeEach(() => {
//     userHome = shallow(<UserHome email={'cody@email.com'} />)
//   })

//   it('renders the email in an h3', () => {
//     expect(userHome.find('h3').text()).to.be.equal('Welcome, cody@email.com')
//   })
// })

import {UserHome, mapState} from './user-home'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('UserHome', () => {

  describe('the mapState function', () => {
    let fakeState = {user: {email: 'hello@aol.com'}}

    it('should return an email object', () => {
      expect(mapState(fakeState).email).to.be.equal('hello@aol.com')
    })
  })

  describe('the plain component', () => {
    let userHome = shallow(<UserHome email={'apples@apple.com'}/>)

    it('should render a component with the correct email', () => {
      expect(userHome.find('h3').text()).to.be.equal('Welcome, apples@apple.com')
    })
  })

})