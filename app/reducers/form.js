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
            
            console.log('send form message');
            console.log(action);
            let {type, ...form} = action;
            
            let newState = Object.assign({}, {...form});
            
            console.log('newform');
            console.log(newState);
            
            return newState;
        default:
            return state;
    }
}