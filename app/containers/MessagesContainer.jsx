import React from 'react';
import { connect } from 'react-redux'
import Messages from '../components/Messages.jsx'
const mapStateToProps = (state, ownProps) => {
    console.log('props section');
    console.log(ownProps.section);
    
    switch (ownProps.section) {
        case 'welcome':
            console.log('in welcome container');
            return {
                 messages: state.welcomeMessages
            };
        case 'assistance':
            console.log('in assistance container');
            return {
                 messages: state.assistanceMessages
            };
        case 'child':
            console.log('in child container');
            return {
                 messages: state.childMessages
            };
        case 'childincome':
            console.log('in childincome container');
            return {
                messages: state.childIncomeMessages
        };
        case 'adult':
            console.log('in adult container');
            return {
                messages: state.adultMessages
        };
        case 'complete':
            console.log('in complete container');
            return {
                messages: state.completeMessages
        };
      }
}

const MessagesContainer = connect(mapStateToProps)(Messages)

export default MessagesContainer