
const childNameReducer = (state = {}, action) => {
    
    let name = {
        lName: action.lName,
        mName: action.mName,
        fName: action.fName
    }
    
    let newState = Object.assign({}, state);
    newState[action.cid] = name; 
    
    return newState;
}

const adultNameReducer = (state = {}, action) => {
    
    let newAdult = {
        lName: action.lName,
        mName: action.mName,
        fName: action.fName
    }
    
    let indx = 0;
    if (action.aid) indx = action.aid; //if update to specific index we use
    
    let newState = Object.assign({}, state);
    //this might erase has_income if we come back to modify.. check again later
    newState[indx] = newAdult; 
    
    return newState;
}

const adultHasIncomeReducer = (state = {}, action) => {
    let indx = 0;
    if (action.aid) indx = action.aid; //if update to specific index we use
    
    let newState = Object.assign({}, state);
    
    newState[indx].has_income = action.value;
    
    return newState;
}


const childIsStudentReducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    
    let newChild = Object.assign({}, state[action.cid]);
    newChild.isStudent = action.value;
    
    newState[action.cid] = newChild;
    
    return newState;
}

const childStatusReducer = (state = {}, action) => {
    let newState = Object.assign({}, state);
    
    let newChild = Object.assign({}, state[action.cid]);
    
    
    const newChildWithStatus = Object.assign({}, newChild, {statuses: action.value});
    
    newState[action.cid] = newChildWithStatus;
    
    return newState;
}


export default function appData(state = {}, action) {
    
    switch (action.type) {
        case "SUBMIT_APPLICATION":
            return Object.assign({}, state, {submit: true});
        case "ADD_FIRST_TIME":
            const isNewApp = action.value;
            //use time for now
            let d = new Date();
            let utc = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDay(), d.getUTCHours(), d.getUTCMinutes(), d.getUTCSeconds(), d.getUTCMilliseconds());
            const newPin = utc.toString();
            
            return Object.assign({}, state, {isNewApp, pin: newPin});
        case "ADD_CHILD_COUNT":
            let child_cnt = parseInt(action.value);
            let childInitState = Object.assign({}, state);
            
            if (!state.childSteps) {
                //initialize
                let childSteps = {};
                
                for (let i = 0; i < child_cnt; i++) {
                    childSteps[i] = {
                        asked_name: false,
                        asked_status: false,
                        asked_has_income: false,
                        asked_income: false
                    }
                }
                
                childSteps.current_child = 0;
                childSteps.asked_count = true;
                childInitState['childSteps'] = childSteps;
            }
            
            return Object.assign({}, childInitState, {childcount: child_cnt });
        case "ADD_CHILD_NAME":
        
            //update childsteps as well
            let child_name = childNameReducer(state.child, action);
            
            return Object.assign({}, state, {child: child_name})
        case "ADD_CHILD_IS_STUDENT":
            //update childsteps as well
            let student = childIsStudentReducer(state.child, action);
            
            return Object.assign({}, state, {child: student})
        case "ADD_CHILD_STATUSES":
            //update childsteps as well
            let status = childStatusReducer(state.child, action);
            
            return Object.assign({}, state, {child: status})
        case "ADD_CHILD_INCOME":
            if(state.child_income_index.length > 0) {
                let tempindx = [...state.child_income_index];
                tempindx.shift();
                
               return Object.assign({}, state, {child_income_index: tempindx})
            } 
            return state;
        case "ADD_CHILD_HAS_INCOME":
            let names = action.value;
            let indexToAdd = [];
            Object.keys(names).forEach((v, i) => {
               if (names[v] && v != 'None') indexToAdd.push(i)
            });
            //not robust but should work
            return Object.assign({}, state, {child_income_index: indexToAdd});
        case "INC_CHILD_INDEX":
            
            let newCId = (action.cid + 1);
            let newChildSteps = Object.assign({}, state);
            
            newChildSteps.childSteps.current_child = newCId;
            
            return newChildSteps;
        case "ADD_ADULT_COUNT":
            let cnt = parseInt(action.value);
            
            let initState = Object.assign({}, state);
            
            if (!state.adultSteps) {
                //initialize
                let adultSteps = {};
                
                for (let i = 0; i < cnt; i++) {
                    adultSteps[i] = {
                        asked_name: false,
                        asked_has_income: false,
                        asked_income: false
                    }
                }
                
                adultSteps.current_adult = 0;
                adultSteps.asked_count = true;
                initState['adultSteps'] = adultSteps;
            }
            
            return Object.assign({}, initState, {adultcount: cnt });
        case "INC_ADULT_INDEX":
            
            let newId = (action.aid + 1);
            let newSteps = Object.assign({}, state);
            newSteps.adultSteps.current_adult = newId;
            return newSteps;
        case "ADD_ADULT_NAME":
        
            let adult = adultNameReducer(state.adult, action);
            
            return Object.assign({}, state, {adult: adult})
        case "ADD_ADULT_HAS_INCOME":
        
           let adulthasincome = adultHasIncomeReducer(state.adult, action);
            return Object.assign({}, state, {adult: adulthasincome})
            
        default:
            return state;
    }
}

