import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class AssistanceApp extends React.Component {
  
   componentWillMount() {
       this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('assistance'));
      this.props.dispatch(core.sendInitialForm('assistance'));
      this.props.dispatch(core.setCurrentSection('assistance'));
  }
  
  componentDidMount() {
      
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Assistance Programs</h1>
            <MessagesContainer section='assistance' />
            <AnswerContainer section='assistance' />
        </div>
    )
  }
}

const AssistanceAppContainer = connect()(AssistanceApp)

export default AssistanceAppContainer