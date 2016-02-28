
const initial = {
    has_program: false,
    caseNumber: '',
    programName: '',
}

export default function progress(state = initial, action) {
    
    switch (action.type) {
        case 'ADD_HAS_PROGRAM':
            return Object.assign({}, state, {has_program: action.value});
        case 'ADD_ASSISTANCE_PROGRAM':
            
            let newState = {};
            newState.has_program = action.has_program;
            newState.caseNumber = action.caseNumber;
            newState.programName = action.programName;
            
            return Object.assign({},  newState);
        default:
            return state;
    }
}