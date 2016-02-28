import React from 'react';

import mapHelpText from '../lib/ActionToHelpText'


// const initialHelp = {
//     'welcome': {
//         text: ['On this panel, we will provide help and definitions to terms that you will encounter during your application process.']
//     },
//     'child' : {
//         text: []
//     }
    
// }

class HelpApp extends React.Component {
  
  
  renderLi = (helptext) => {
      return (
          <div>
                <div className="help-section">
                    <i className="fa fa-info-circle fa-2x help-info-icon"></i>
                    <h3 key={Math.random()} className="help-section-title">More Info</h3>
                    <ul className="help-text-list">
                    {
                        helptext.text.map((c, i) => (
                        <li className="help-text" key={Math.random()}>{c}</li>
                        ))
                    }
                    </ul>
                </div>
        </div>
        )
  }
  
  renderP = (helptext) => {
      return (
          <div>
                <div className="help-section">
                    <i className="fa fa-info-circle fa-2x help-info-icon"></i>
                    <h3 key={Math.random()} className="help-section-title">More Info</h3>
                    {
                        helptext.text.map((c, i) => (
                        <p className="help-text" key={Math.random()}>{c}</p>
                        ))
                    }
                </div>
        </div>
        )
  }
  
  render() {
      const {help} = this.props;
      const section = help.section;
      
      
      let action = '';
      if (help.cbAction) action = help.cbAction.type;
      const helptext = mapHelpText(action);
      let type = 'p';
      if (helptext.type) type = helptext.type;
      return (
          <div>
               {type == 'li' ? this.renderLi(helptext) : this.renderP(helptext)}
        </div>
        )
  }
}

export default HelpApp