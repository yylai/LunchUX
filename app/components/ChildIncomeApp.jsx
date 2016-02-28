import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class ChildIncomeApp extends React.Component {
  
   componentWillMount() {
       this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('childincome'));
      this.props.dispatch(core.sendInitialForm('childincome'));
      this.props.dispatch(core.setCurrentSection('childincome'));
  }
  
  componentDidMount() {
      
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Child Income</h1>
            <MessagesContainer section='childincome' />
            <AnswerContainer section='childincome' />
        </div>
    )
  }
}

const ChildAppIncomeContainer = connect()(ChildIncomeApp)

export default ChildAppIncomeContainer