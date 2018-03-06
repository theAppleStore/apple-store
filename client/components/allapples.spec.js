import {AllApples, mapState} from './allapples'
import {expect} from 'chai'
import enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import React from 'react'

const adapter = new Adapter()
enzyme.configure({adapter})

describe('AllApples', () => {

  describe('the mapState function', () => {
    let fakeState = {
      apples: [{
        id: 1,
        name: 'Fuji',
        image: '/images/red-fuji.png',
        price: 1.50,
        description: 'The Sweetest Apple Around.',
        stock: 50,
        category: 'red'
      }],
      isAdmin: true
    }

    it('should return an email object', () => {
      expect(mapState(fakeState).isAdmin).to.be.equal(true)
    })

    it('should return an array length of 1', () => {
      expect(mapState(fakeState).apple.length).to.be.equal(1)
    })
  })
})
