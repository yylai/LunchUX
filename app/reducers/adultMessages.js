const initial = [
                {
                    msgType: 'APP',
                    text: ["Now we will guide you through the process to fill out information for the adults in your household."]
                }
            ];

export default function AdultIncomeMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
            if (action.section != 'adult') return state;
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