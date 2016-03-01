export const steps = {
    ASK_ASSISTANCE_START: 'ASK_ASSISTANCE_START',
    ASK_ASSISTANCE_PROGRAM: 'ASK_ASSISTANCE_PROGRAM',
    ASK_ASSISTANCE_PASS: 'ASK_ASSISTANCE_PASS',
    ASK_ASSISTANCE_DONE: 'ASK_ASSISTANCE_DONE'
}


export const messages = (step, state) => {
     switch (step) {
         case steps.ASK_ASSISTANCE_START:
            return [
                ['We would like to know if anyone in your household participates in a assistance program.']
            ]
         case steps.ASK_ASSISTANCE_PROGRAM:
            return [
                ['Choose the applicable program and we will prompt you to enter the case number.'],['If no one in your household participates in any of these assistance programs, Select None.']
            ]
         case steps.ASK_ASSISTANCE_DONE:
            return [
                ['Ok, since no one in your household participated in any of the assitance program, we would like to know if any child(ren) you listed have income.']
            ]
        case steps.ASK_ASSISTANCE_PASS:
            return [
                ['Great! You will now be directed to sign & complete your application!']
            ]
        default:
            return [
                ['I am speechless. You have found a bug in the assistance logic..']
               ]
     }
}

export const form = (step, state) => {
    switch (step) {
         case steps.ASK_ASSISTANCE_START:
            return {
                formType: 'ANS_NEXT',
                cbAction: {type: 'GET_NEXT_STEP'},
                section: 'assistance',
                value: true,
                text: "Next"
            }
         case steps.ASK_ASSISTANCE_PROGRAM:
            return {
            formType: 'ANS_ASSISTANCE_PROGRAM',
            cbAction: {type: 'ADD_ASSISTANCE_PROGRAM'},
            section: 'assistance'
        }
        case steps.ASK_ASSISTANCE_PASS:
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'assistance',
            text: "Complete & Sign Application"
        }
         case steps.ASK_ASSISTANCE_DONE:
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'assistance',
            text: "Child Income Information"
        }
        default:
            return [
                ['I am speechless. You have found a bug in the assistance logic..']
               ]
     }
}


export const toNextSection = (prevStep) => {
    if (prevStep == steps.ASK_ASSISTANCE_PASS) return true;
    if (prevStep == steps.ASK_ASSISTANCE_DONE) return true;
    
    return false;
}


export const getNextSection = (prev, state) => {
    
    if (state.assistance && state.assistance.has_program) {
        return 'complete';
     }
    return 'childincome'
}


export const refreshSteps = (prevStep, state) => {
    
    switch (prevStep) {
        case steps.ASK_ASSISTANCE_START:
        
            return [steps.ASK_ASSISTANCE_PROGRAM];
        case steps.ASK_ASSISTANCE_PROGRAM:
             if (state.assistance && state.assistance.has_program) {
                   return [steps.ASK_ASSISTANCE_PASS];
             }
        
            return [steps.ASK_ASSISTANCE_DONE];
        case steps.ASK_ASSISTANCE_PASS:
            return [steps.ASK_ASSISTANCE_DONE];
            
        case steps.ASK_ASSISTANCE_DONE:
            //not needed.. or might apply for "reloading"
        
        default:
            console.log('Bad step for Assistance');
    }
}