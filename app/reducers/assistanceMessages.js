const initial = [
                {
                    msgType: 'APP',
                    text: ["Great! You have completed Step 1 of entering your children info."]
                }
            ];

export default function assistanceMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
         
            if (action.section != 'assistance') return state;
            if (action.msgType === 'FORM') return state;
            
            console.log(action);
        
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