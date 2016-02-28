import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class CompleteApp extends React.Component {
  
   componentWillMount() {
      this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('complete'));
      this.props.dispatch(core.sendInitialForm('complete'));
      this.props.dispatch(core.setCurrentSection('complete'));
  }
  
  componentDidMount() {
      
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Sign & Complete Application</h1>
            <MessagesContainer section='complete' />
            <AnswerContainer section='complete' />
        </div>
    )
  }
}

const CompleteAppContainer = connect()(CompleteApp)

export default CompleteAppContainer