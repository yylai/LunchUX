export const steps = {
    ASK_ADULT_START: 'ASK_ADULT_START',
    ASK_ADULT_COUNT: 'ASK_ADULT_COUNT',
    ASK_ADULT_NAME: 'ASK_ADULT_NAME',
    ASK_ADULT_HAS_INCOME: 'ASK_ADULT_HAS_INCOME',
    ASK_PROCEED_TO_NEXT_ADULT: 'ASK_PROCEED_TO_NEXT_ADULT',
    ASK_ADULT_INCOME: 'ASK_ADULT_INCOME',
    ASK_ADULT_DONE: 'ASK_ADULT_DONE'
}


const hasMoreAdultsToAdd = (state) => {
    return false;
}

const hasIncomeToAdd = (state, aid) => {
    return state.adult[aid].has_income; 
}


export const messages = (step, state) => {
    let adultData = state.appData.adult;
    let adultSteps = state.appData.adultSteps;
    let currentAid = 0;
    
    switch (step) {
        case steps.ASK_ADULT_START:
            return [
                ['We will be asking you the size of your household members and income for each adult.']
                ];
        case steps.ASK_ADULT_COUNT:
             const adultcountmsg = [];
             adultcountmsg.push(['Including yourself, how many adult members are in your household?']);
             
             
            return adultcountmsg;
        case steps.ASK_ADULT_NAME:
            const namemsg = [];
            //if current is not complete, then say please provide name of next audit
            namemsg.push(["Please provide the full name of the adult"]);
            
            return namemsg;
        case steps.ASK_ADULT_HAS_INCOME:
            const hasincomemsg = [];
            currentAid = adultSteps.current_adult;
            
            const name = adultData[currentAid].fName;
            const namehasincome = 'Does ' + name + ' receive income?';
            
            hasincomemsg.push([namehasincome]);
            
            return hasincomemsg;
        case steps.ASK_PROCEED_TO_NEXT_ADULT:
             const moreAdults = [];
             //we increment the aid at this step
             //so we check for aid+1
             currentAid = adultSteps.current_adult;
            if ((currentAid + 1) == state.appData.adultcount) {
                moreAdults.push(["Ok, we are done with this section."]);
            } else {
                moreAdults.push(["Ok, let's move on to the next adult..."]);
            }
            
            return moreAdults;
        case steps.ASK_ADULT_INCOME:
            
            const adultincmsg = [];
             
            adultincmsg.push(['IMPORTANT! Having accurate income information is crucial for your application. Please answer to the best of your knowledge.']);
            //adultincmsg.push(['First, you will pick an income category, and we will ask you details on the income amount and how often']);
            //adultincmsg.push(["Don’t worry, you will be able to review and edit your answers before final submission."]);

             return adultincmsg;
        case steps.ASK_ADULT_DONE:
            const donemsg = [];
            
            donemsg.push(["You have completed entering all the adult information necessary for your application. Next is to sign and submit your application!"])
            donemsg.push(["Let's get right to it."]);
            
            return donemsg;
        default:
            return [
                ['I am speechless. You have found a bug in the adult logic..' + step]
            ]
    }
    
}



export const form = (step, state) => {
    
    let adultData = state.appData.adult;
    let adultSteps = state.appData.adultSteps;
    let currentAid = 0;
    
     switch (step) {
        case steps.ASK_ADULT_START:
        return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'adult',
            value: true
        };
        case steps.ASK_ADULT_COUNT:
            return {
            formType: 'ANS_SINGLE_INPUT',
            cbAction: {type: 'ADD_ADULT_COUNT'},
            section: 'adult',
            title: 'Numbers only',
            value: 'number',
            placeholder: "# of Adults",
            min: 1
        };
        case steps.ASK_ADULT_NAME:
         currentAid = adultSteps.current_adult;
         return {
            formType: 'ANS_NAME',
            cbAction: {type: 'ADD_ADULT_NAME', aid: currentAid},
            section: 'adult',
            title: 'The First and Last Name are required.',
        };
        case steps.ASK_ADULT_HAS_INCOME:
        currentAid = adultSteps.current_adult;
            return {
               formType: 'ANS_YN',
                cbAction: {type: 'ADD_ADULT_HAS_INCOME', aid: currentAid},
                section: 'adult',
        };
        case steps.ASK_PROCEED_TO_NEXT_ADULT:
            currentAid = adultSteps.current_adult;
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'INC_ADULT_INDEX', aid: currentAid},
            section: 'adult',
            value: true
        };
        case steps.ASK_ADULT_INCOME:
            currentAid = adultSteps.current_adult;
            return {
                formType: 'ANS_ADULT_INCOME',
                cbAction: {type: 'ADD_ADULT_INCOME', aid: currentAid},
                section: 'adult'
            }
        case steps.ASK_ADULT_DONE:
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'adult',
            aid: currentAid,
            value: true,
            text: 'Sign and Finish Application!'
        }
        default:
            console.log('BAD form type for Adult steps');
    }
}

export const toNextSection = (prevStep) => {
     if (prevStep == 'ASK_ADULT_DONE') return true;
    
    return false;
}

export const getNextSection = () => {
    return "complete";   
}

export const refreshSteps = (prevStep, state) => {
    
    let adultData = state.appData.adult;
    let adultSteps = state.appData.adultSteps;
    let currentAid = 0;
    
    switch (prevStep) {
        case steps.ASK_ADULT_START:
            //here is where we can check adultSteps and jump right to the
            //next step if user happens to reload the app
            
            return [steps.ASK_ADULT_COUNT];
        case steps.ASK_ADULT_COUNT:
        
            return [steps.ASK_ADULT_NAME, steps.ASK_ADULT_HAS_INCOME]
            
        case steps.ASK_ADULT_NAME:
            //most likely this won't get hit
            return [steps.ASK_ADULT_INCOME]
        
        case steps.ASK_ADULT_HAS_INCOME:
            currentAid = adultSteps.current_adult;
            
            if (adultData[currentAid].has_income) {
                return [steps.ASK_ADULT_INCOME]
            } else {
                return [steps.ASK_PROCEED_TO_NEXT_ADULT]
            }
            
        case steps.ASK_PROCEED_TO_NEXT_ADULT:
            currentAid = adultSteps.current_adult;
            
            if (currentAid == state.appData.adultcount) {
                return [steps.ASK_ADULT_DONE]
            } else {
                return [steps.ASK_ADULT_NAME, steps.ASK_ADULT_HAS_INCOME]
            }
            
        case steps.ASK_ADULT_INCOME:
             return [steps.ASK_PROCEED_TO_NEXT_ADULT]
        case steps.ASK_ADULT_DONE:
            //if somemore..?
        default:
            console.log('BAD form type for adult steps');
    }
}