import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class AdultApp extends React.Component {
  
   componentWillMount() {
      this.props.dispatch(core.setPreviousStep(''));
      this.props.dispatch(core.setNextStep('adult'));
      this.props.dispatch(core.sendInitialForm('adult'));
      this.props.dispatch(core.setCurrentSection('adult'));
  }
  
  componentDidMount() {
  }
  
  render() {
      return (
        <div>
            <h1 className="section-header">Adult Details</h1>
            <MessagesContainer section='adult' />
            <AnswerContainer section='adult' />
        </div>
    )
  }
}



const AdultAppContainer = connect()(AdultApp)

export default AdultAppContainer