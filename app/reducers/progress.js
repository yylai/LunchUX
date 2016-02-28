
const InitialProgress = {
    'welcome': false,
    'child': false,
    'assistance': false,
    'childincome': false,
    'adult': false,
    'complete': false,
    current: ''
}

export default function progress(state = InitialProgress, action) {
    
    switch (action.type) {
        case 'SET_CURRENT_SECTION':
            return Object.assign({}, state, {current: action.value});
        case 'MARK_COMPLETED':
            let newstate = Object.assign({}, state);
            newstate[action.value] = true;
            return newstate;
        case "MARK_ALL_COMPLETED":
            let exceptlaststep = {
                'welcome': true,
                'child': true,
                'assistance': true,
                'childincome': true,
                'adult': true
            }
            return Object.assign({}, state, {...exceptlaststep});
            
        case 'SEND_MESSAGE':
            if (action.msgType != 'FORM') return state;
            
            let {section} = action;
            
            if (section == 'submitted') {
                let allcompleted = {
                'welcome': true,
                'child': true,
                'assistance': true,
                'childincome': true,
                'adult': true,
                'complete': true
                }
                
                console.log('asas');
                console.log(allcompleted)
            return Object.assign({}, state, {...allcompleted});
            }
            return state;
        default:
            return state;
    }
}