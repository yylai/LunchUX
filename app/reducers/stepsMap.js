const initial = ['ASK_FIRST_TIME'];

export default function stepsMap(state = initial, action) {
    switch (action.type) {
        case 'SET_NEXT_STEP':
            return [action.value];
        case 'POP_STEP':
            console.log('stepsmaps: ');
            console.log(state);
            return state.slice(1);
        case 'REFRESH_STEPS':
            return action.steps.slice();
        case 'ADD_STEP':
            //every new navigation should push in the start step for he
            //next page..
            const newsteps = action.steps.slice();
            newsteps.push(action.step);
        default:
            return state;
    }
}