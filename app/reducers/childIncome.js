
const initial = [];

export default function childIncome(state = initial, action) {
    
    switch (action.type) {
        case 'ADD_CHILD_INCOME':
        console.log('yyyzzz');
            console.log(action)
            const result = [...state, {cid: action.cid, income: action.income}];
            
            
            
            return result;
        default:
            return state;
    }
}