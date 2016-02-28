import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class ChildApp extends React.Component {
  
   componentWillMount() {
      this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('child'));
      this.props.dispatch(core.sendInitialForm('child'));
      this.props.dispatch(core.setCurrentSection('child'));
  }
  
  componentDidMount() {
      //this.context.store.getState()
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Child Details</h1>
            <MessagesContainer section='child' />
            <AnswerContainer section='child' />
        </div>
    )
  }
}

const ChildAppContainer = connect()(ChildApp)

export default ChildAppContainer