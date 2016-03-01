const initial = [
                {
                    msgType: 'APP',
                    text: ["Congratulations! This is the last step before you can submit your completed application."]
                }
            ];

export default function CompleteMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
         
            if (action.section != 'complete') return state;
            //might fail for testing if we restrict to rrul
            if (action.msgType === 'FORM') return state;
            
            return [
                ...state, 
                {
                    msgType: action.msgType,
                    text: action.text
                }
            ]
        default:
            return state;
    }
}