

const initial = [
                {
                    msgType: 'APP',
                    
                    text: ["Now we will guide you through the process to fill out information for your children."]
                }
            ];

export default function childMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
            if (action.section != 'child') return state;
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