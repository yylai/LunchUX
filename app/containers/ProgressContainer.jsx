import React from 'react';
import { connect } from 'react-redux'
import ProgressComponent from '../components/Progress.jsx'


const mapStateToProps = (state) => {
  return {
    progress: state.progress
  }
}

const ProgressContainer = connect(mapStateToProps)(ProgressComponent)

export default ProgressContainer