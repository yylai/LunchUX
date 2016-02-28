
const initial = {
    races: [],
    ssn: '',
    has_ssn: false,
    name: {},
    signature: {},
    address: {
        street: '',
        apt: '',
        city: '',
        state: '',
        zip: ''
    },
    datesigned: {
        
    }
}

export default function signer(state = initial, action) {
    
    switch (action.type) {
        case 'ADD_SIGNER_SSN':
            return Object.assign({}, state, {has_ssn: action.has_ssn, 
            ssn: action.ssn});
        case 'ADD_SIGNER_NAME_ADDRESS':
            let newaddr = Object.assign({}, state);
            return Object.assign({}, state, {address: action.address});
            
            return newaddr;
        
        case 'ADD_SIGNER_NAME_SIGNATURE':
            let newstate = Object.assign({}, state);
            return Object.assign({}, state, {name: action.name, signature: action.signature});
            //add date signed here automatically
            
            return newstate;
        case 'ADD_SIGNER_RACE':
            return Object.assign({}, state, {races: action.races});
        default:
            return state;
    }
}