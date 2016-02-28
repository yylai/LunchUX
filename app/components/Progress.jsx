import React from 'react';
import { connect } from 'react-redux'
import * as core from '../lib/core'

class ProgressApp extends React.Component {
  
  componentWillMount() {
  }
  
  componentDidMount() {
      //this.context.store.getState()
  }
  
  mapSectionNameToLinkName(section) {
      switch (section) {
        case 'welcome':
            return 'Welcome';
        case 'child':
            return 'Child Information';
        case 'assistance':
            return 'Assistance Programs';
        case 'childincome':
            return 'Child Income';
        case 'adult':
            return 'Adult Information';
        case 'complete':
            return 'Sign & Complete Application';
        default:
            return '';
      }
  }
  
  mapLinkNameToSection(linkname) {
      switch (linkname) {
        case 'Welcome':
            return 'welcome';
        case 'Child Information':
            return 'child';
        case 'Assistance Programs':
            return 'assistance';
        case 'Child Income':
            return 'childincome';
        case 'Adult Information':
            return 'adult';
        case 'Sign & Complete Application':
            return 'complete';
        default:
            return '';
      }
  }
  
  isInProgress(linkName) {
      const {progress} = this.props;
      let mappedLinkName = this.mapSectionNameToLinkName(progress.current);
      return (mappedLinkName == linkName);
  }
  
  isComplete(linkName) {
       const {progress} = this.props;
      let sectionname = this.mapLinkNameToSection(linkName);
      return progress[sectionname];
  }
  
  getClassName(linkName) {
      if (this.isComplete(linkName)) {
          return 'progress-complete';
      } else if (this.isInProgress(linkName)) {
            return 'progress-inprogress';
      }
  }
  
  render() {
     const links = ['Welcome', 'Child Information', 'Assistance Programs', 'Child Income', 'Adult Information', 'Sign & Complete Application'];
     
      const {progress} = this.props;
     return (
        <div className="left-section progress">
            <h3 className="left-section-title">Application Progress</h3>
            <ul className="progress-items">
            {
                links.map(name => {
                    return <li key={name} className={this.getClassName(name)}>{name}</li>
                })
            }
            </ul>
            
            <div>
            {
                progress['complete'] ? null : <button type="button" className="pure-button button-secondary">Save & Finish Later</button>
            }
                
            </div>
        </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
        return {
            progress: state.progress
        }
}


const ProgressAppContainer = connect(mapStateToProps)(ProgressApp)

export default ProgressAppContainer