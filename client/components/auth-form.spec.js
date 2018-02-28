import { AuthForm, mapLogin } from './auth-form'
import { expect } from 'chai'
import { shallow } from 'enzyme'
import React from 'react'

describe('AuthForm', () => {
  describe('the mapLogin function', () => {
    let fakeState = {
      name: 'login',
      displayName: 'Login',
      user: {error: 'You have an error'}
    }

    it ('should return return a login object with name', () => {
      expect(mapLogin(fakeState).name).to.be.equal('login')
    })

    it ('should return return a login object with displayName', () => {
      expect(mapLogin(fakeState).displayName).to.be.equal('Login')
    })
    
    it ('should return return a login object with error', () => {
      expect(mapLogin(fakeState).error).to.be.equal('You have an error')
    })
  })
})