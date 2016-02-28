const initial = 'START';

export default function stepsMap(state = initial, action) {
    switch (action.type) {
        case 'SET_PREVIOUS_STEP':
            return action.value;
        default:
            return state;
    }
}