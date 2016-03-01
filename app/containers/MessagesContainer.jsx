import React from 'react';
import { connect } from 'react-redux'
import Messages from '../components/Messages.jsx'
const mapStateToProps = (state, ownProps) => {
    console.log('props section');
    console.log(ownProps.section);
    
    switch (ownProps.section) {
        case 'welcome':
            return {
                 messages: state.welcomeMessages
            };
        case 'assistance':
            return {
                 messages: state.assistanceMessages
            };
        case 'child':
            return {
                 messages: state.childMessages
            };
        case 'childincome':
            return {
                messages: state.childIncomeMessages
        };
        case 'adult':
            return {
                messages: state.adultMessages
        };
        case 'complete':
            return {
                messages: state.completeMessages
        };
      }
}

const MessagesContainer = connect(mapStateToProps)(Messages)

export default MessagesContainer