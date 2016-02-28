

export default function getNextStep(state = false, action) {
    
    switch (action.type) {
        case 'GET_NEXT_STEP':
            console.log('getnextstepreducer:');
            console.log(action);
            return action.value;
    }
    
    return state;
}