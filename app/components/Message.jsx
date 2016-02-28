import React from 'react';
import ReactDOM from 'react-dom';

const Paragraph = props => (
    <p className="message-p">
        {props.text}
    </p>
);

const renderText = (msg) => (
    
    <div className="message" >
        <div className="message-bubble">
        	{msg.text.map( (m,i) =>
                <Paragraph key={i} text={m} />
            )} 
        </div>
    </div>
)

//assuming all 1 line response and simple text reply
//if not we can check in there n render special ones
//and odds of key being non unique is slim since response is one per x time
const renderResponse = (msg) => (
     <div className="message clear" >
        <div className="message-bubble reply">
            <Paragraph text={msg.text} />
        </div>
    </div>
)

class Message extends React.Component {
    
  render() {
    const {msg} = this.props;
    return (
        <div>
            {
                msg.msgType == 'APP' ? renderText(msg) : renderResponse(msg)
            }
        </div>
    )
  }
  
  componentDidMount() {
    var node = ReactDOM.findDOMNode(this);
    node.scrollIntoView();
  }

}

export default Message