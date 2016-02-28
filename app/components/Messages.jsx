import React from 'react';
import Message from './Message.jsx';
import FlipMove from 'react-flip-move';

//  <FlipMove  duration={500}
//   delay={0}
//   easing={'cubic-bezier(0.39, 0, 0.45, 1.4)'}
//   staggerDurationBy={22}
//   staggerDelayBy={0}>
// </FlipMove>

export default ({messages}) => {
    
    console.log(messages);
    
    return (
        <div className="messages">
         <FlipMove  duration={500}
            delay={0}
            easing={'cubic-bezier(0.39, 0, 0.45, 1.4)'}
            staggerDurationBy={22}
            staggerDelayBy={0}>
        {
            messages.map((m,i) => {
                return <Message key={i} msg={m} />
            })
        }
        </FlipMove>
        </div>
    );
}