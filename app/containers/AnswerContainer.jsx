import React from 'react';
import { connect } from 'react-redux'
import AnswerComponent from '../components/Answer.jsx'

const UpdateState = (dispatch, updateAction, formData) => {
    
    console.log(updateAction);
    
    let action = Object.assign(updateAction, {...formData});
    console.log(action);
    
    dispatch(action);
}

const ShowAppMsg = (dispatch, replyText, currSection) => {
    
    dispatch({
        type: 'SEND_MESSAGE',
        msgType: 'APP',
        text: replyText,
        section: currSection
    });
}

const ShowReply = (dispatch, replyText, currSection) => {
    
    dispatch({
        type: 'SEND_MESSAGE',
        msgType: 'REPLY',
        text: replyText,
        section: currSection
    });
}

const SendNextMsg = (dispatch) => {
    dispatch({
        type: 'GET_NEXT_STEP',
        value: true
    })
}

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
      nextStep: (updateAction, formData, replyText) => {
        
        if (replyText) ShowReply(dispatch, replyText, ownProps.section);
        
        UpdateState(dispatch, updateAction, formData);
        
        if (updateAction.type != 'GET_NEXT_STEP') {
            SendNextMsg(dispatch);  
      }
  },
    replycb: (replyText) => {
        ShowReply(dispatch, replyText, ownProps.section);
    },
    appmsgcb: (appText) => {
        ShowAppMsg(dispatch, appText, ownProps.section);
    }
}
}

const mapStateToProps = (state, ownProps) => {
        return {
            form: state.form
        }
}

const AnswerContainer = connect(mapStateToProps, mapDispatchToProps)(AnswerComponent)

export default AnswerContainer