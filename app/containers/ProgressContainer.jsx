import React from 'react';
import { connect } from 'react-redux'
import ProgressComponent from '../components/Progress.jsx'
import request from 'superagent';

const mapStateToProps = (state) => {
  return {
    progress: state.progress
  }
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

const mapDispatchToProps = (dispatch, ownProps) => {

  return {
    submitApp: () => {
        //dispatch({type: "SUBMIT_APPLICATION"});
    },
    replycb: (replyText, section) => {
        ShowReply(dispatch, replyText, section);
    },
    appmsgcb: (appText, section ) => {
        ShowAppMsg(dispatch, appText, section);
    }
}
}

const ProgressContainer = connect(mapStateToProps, mapDispatchToProps)(ProgressComponent)

export default ProgressContainer