
const initial = [];

export default function adultIncome(state = initial, action) {
    
    switch (action.type) {
        case 'ADD_ADULT_INCOME':
            
            const result = [...state, {aid: action.aid, income: action.income}];
            return result;
        default:
            return state;
    }
}