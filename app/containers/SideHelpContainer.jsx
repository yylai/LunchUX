import React from 'react';
import { connect } from 'react-redux'
import SideHelpComponent from '../components/SideHelp.jsx'



const mapStateToProps = (state) => {
  return {
    help: state.form
  }
}

const SideHelpContainer = connect(mapStateToProps)(SideHelpComponent)

export default SideHelpContainer