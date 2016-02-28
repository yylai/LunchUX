import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class WelcomeApp extends React.Component {
  
  componentWillMount() {
       this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('welcome'));
      this.props.dispatch(core.sendInitialForm('welcome'));
      this.props.dispatch(core.setCurrentSection('welcome'));
  }
  
  componentDidMount() {
      //this.context.store.getState()
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Welcome</h1>
            <MessagesContainer section='welcome' />
            <AnswerContainer section='welcome' />
        </div>
    )
  }
}

const WelcomeAppContainer = connect()(WelcomeApp)

export default WelcomeAppContainer