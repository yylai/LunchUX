'just to kick start'
const initial = {
    formType: 'ANS_NEXT',
    cbAction: {
        type: 'GET_NEXT_STEP'
    }
};

export default function form(state = initial, action) {
    
    switch (action.type) {
        case 'SEND_MESSAGE':
            if (action.msgType != 'FORM') return state;
            
            let {type, ...form} = action;
            
            let newState = Object.assign({}, {...form});
            
            
            return newState;
        default:
            return state;
    }
}