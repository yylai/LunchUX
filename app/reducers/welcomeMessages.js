

const initial = [
                {
                    msgType: 'APP',
                    text: ["Welcome to Lunch For Me!"]
                },
                {
                    msgType: 'APP',
                    text: ["Now you can apply for free or reduced meals quicker and easier with our online conversational application process.."]
                }
            ];

export default function welcomeMessages(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
         
            if (action.section != 'welcome') return state;
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