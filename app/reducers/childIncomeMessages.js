const initial = [
                {
                    msgType: 'APP',
                    text: ["Since no one in your household participated in any of the assistance program, we will now ask you on the children income."]
                }
            ];

export default function childIncomeMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
            if (action.section != 'childincome') return state;
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