const initial = {
    races: {},
    ssn: '',
    has_ssn: false,
    name: {},
    signature: {},
    address: {
        address1: '',
        address2: '',
        city: '',
        state: '',
        zip: ''
    },
    datesigned: '',
    email: ''
}

export default function signer(state = initial, action) {
    
    switch (action.type) {
        case 'ADD_EMAIL_ADDRESS':
            return Object.assign({}, state, {email: action.email});
        case 'ADD_SIGNER_SSN':
            return Object.assign({}, state, {has_ssn: action.has_ssn, 
            ssn: action.ssn});
        case 'ADD_SIGNER_NAME_ADDRESS':
            let newaddr = Object.assign({}, state);
            return Object.assign({}, state, {address: action.address});
            
            return newaddr;
        
        case 'ADD_SIGNER_NAME_SIGNATURE':
            let newstate = Object.assign({}, state);
            const d = new Date();
            const ds = d.toLocaleDateString();
            
            return Object.assign({}, state, {name: action.name, datesigned: ds, signature: action.signature, address: action.address});
            //add date signed here automatically
            
            return newstate;
        case 'ADD_SIGNER_RACE':
            
            //submit to 
            let finalState = Object.assign({}, state, {races: action.value});
        
            return finalState;
        default:
            return state;
    }
}