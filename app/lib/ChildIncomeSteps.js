export const steps = {
    ASK_CHILD_INCOME_START: 'ASK_CHILD_INCOME_START',
    ASK_CHILD_HAS_INCOME: 'ASK_CHILD_HAS_INCOME',
    ASK_CHILD_INCOME_DETAILS: 'ASK_CHILD_INCOME_DETAILS',
    ASK_CHILD_INCOME_DONE: 'ASK_CHILD_INCOME_DONE'
}
export const messages = (step, state) => {
    switch (step) {
        case steps.ASK_CHILD_INCOME_START:
            return [
                ['Now we will guide you through the process to fill out income information for your children.']
                ];
        case steps.ASK_CHILD_HAS_INCOME:
                 return [
                ['Please select the children below who has income to report']
                ];       
        case steps.ASK_CHILD_INCOME_DETAILS:
           
            //currentCid = childSteps.current_child;
            //const name = childData[currentCid].fName;
            let nameincome = `Let's start with Jon`;
            
            return [
                ['Having accurate income information is important for your application. Please answer to the best of your knowledge..'],
                ['First, you will pick an income category, and we will ask you the income amount and frequency.'], [nameincome]] 
        case steps.ASK_CHILD_INCOME_DONE:
                 return [
                ["Great! You have completed the section for Child Income."],["You are almost done! Only one more section to go and the application will be complete. Let's move onto the Adults Information section."]
                ];
        default:
            return [
                ['I am speechless. You have found a bug in the child income logic..']
            ]
    }
    
}

export const form = (step, state) => {
     let childData = state.appData.child;
    let childSteps = state.appData.childSteps;
    let currentCid = 0;
    
     switch (step) {
        case steps.ASK_CHILD_INCOME_START:
            return {
                formType: 'ANS_NEXT',
                cbAction: {type: 'GET_NEXT_STEP'},
                section: 'childincome',
                value: true
            };
        case steps.ASK_CHILD_HAS_INCOME:
            
            const names = ['John Snow', 'Bran Stark'];
            // const names = Object.keys(childData).map(k => {
            //     return childData[k].fName;
            // });
            // const ids = Object.keys(childData).map(k => {
            //     return k;
            // });
            
            //hack to store state without resorting to redux, this is local
            //state anyway...
            window.cid = 0;
            
            //get child name and id
            //add names, ids property to multicheck. 
            //at ADD_CHILD_HAS_INCOME, on global reducer, we store global state of the array of child income to work on. cidForIncome
            return {
                formType: 'ANS_MULTICHECK',
                cbAction: {type: 'ADD_CHILD_HAS_INCOME'},
                section: 'childincome',
                title:"Select children that has income.",
                has_na: true,
                has_ok: true,
                text: names
            }
        case steps.ASK_CHILD_INCOME_DETAILS:
            //at ADD_CHILD_INCOME, we pop/slice at global state of cidForIncome then we check in steps DONE if need to come here again
           return {
                formType: 'ANS_CHILD_INCOME',
                cbAction: {type: 'ADD_CHILD_INCOME'},
                section: 'childincome'
            }
        case steps.ASK_CHILD_INCOME_DONE:
         return {
                formType: 'ANS_NEXT',
                cbAction: {type: 'GET_NEXT_STEP'},
                section: 'childincome',
                value: true,
                text: 'Proceed to Adult Information Section'
            };
        
        default:
                console.log('BAD form type for Child income steps');
                return {
                formType: 'ANS_NEXT',
                cbAction: {type: 'GET_NEXT_STEP'},
                section: 'childincome',
                value: true
            }
    }
}

export const toNextSection = (prevStep) => {
     if (prevStep == 'ASK_CHILD_INCOME_DONE') return true;
    
    return false;
}

export const getNextSection = () => {
    return "adult";   
}

export const refreshSteps = (prevStep, state) => {
    const app = state.appData;
    
    switch (prevStep) {
        case steps.ASK_CHILD_INCOME_START:
            return [steps.ASK_CHILD_HAS_INCOME];
        case steps.ASK_CHILD_HAS_INCOME:
            //if all child has no income, go to done
            //if global cid is blank for child income, go to done..
            //else go to income details
            
            //hack for now
            return [steps.ASK_CHILD_INCOME_DETAILS];
            
        case steps.ASK_CHILD_INCOME_DETAILS:
            //check global state for if any more income to work on, 
            //if not, we go to done, else we return income details again
            
            return [steps.ASK_CHILD_INCOME_DONE];
        case steps.ASK_CHILD_INCOME_DONE:
        
            //if somemore..?
        default:
            console.log('BAD form type for Child income steps');
    }
}