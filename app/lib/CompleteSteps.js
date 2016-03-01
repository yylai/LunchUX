export const steps = {
    ASK_COMPLETE_START: 'ASK_COMPLETE_START',
    ASK_COMPLETE_SSN: 'ASK_COMPLETE_SSN',
    ASK_COMPLETE_NAME_SIGNATURE: 'ASK_COMPLETE_NAME_SIGNATURE',
    ASK_COMPLETE_RACE: 'ASK_COMPLETE_RACE',
    ASK_COMPLETE_DONE: 'ASK_COMPLETE_DONE'
}

export const messages = (step, state) => {
    switch (step) {
        case steps.ASK_COMPLETE_START:
            let startmsg = [];
            startmsg.push(["You will need to sign the application and provide your Social Security Number."]);
            return startmsg;
            
        case steps.ASK_COMPLETE_SSN:
            let ssnmsg = [];
            ssnmsg.push(["Does the household's primary wage earner or another adult household member has a Social Security Number?"]);
            ssnmsg.push(["You are eligible to apply for benefits even if you do not have a Social Security Number."]);
            return ssnmsg;
            
        case steps.ASK_COMPLETE_NAME_SIGNATURE:
            let namemsg = [];
            namemsg.push(['By printing your name and signing below. You agree to the following statement:']);
            namemsg.push(['"I certify (promise) that all information on this application is true and that all income is reported.', 
            'I understand that this information is given in connection with the receipt of Federal funds, and that school officials may verify (check) the information.',
            'I am aware that if I purposely give false information, my children may lose meal benefits, and I may be prosecuted under applicable State and Federal laws."']);
            
            return namemsg;
            
        case steps.ASK_COMPLETE_RACE:
            let racemsg = [];
            racemsg.push(['Below are the childrens Racial and Ethnic Identities. Please select any that applies, or select None if you do not wish to share.']);
            return racemsg;
        case steps.ASK_COMPLETE_DONE:
             let donemsg = [];
            donemsg.push(['Congratulations! Your Application has been submitted!']);
            return donemsg;
        default:
            return [
                ['I am speechless. You have found a bug in the sign n complete logic..']
            ]
    }
}

export const form = (step, state) => {
    switch (step) {
        case steps.ASK_COMPLETE_START:
         return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'complete',
            value: true
        };
        case steps.ASK_COMPLETE_SSN:
        return {
                formType: 'ANS_SIGNER_SSN',
                cbAction: {type: 'ADD_SIGNER_SSN'},
                section: 'complete'
            }
        case steps.ASK_COMPLETE_NAME_SIGNATURE:
        return {
                formType: 'ANS_SIGNER_NAME_SIGNATURE',
                cbAction: {type: 'ADD_SIGNER_NAME_SIGNATURE'},
                section: 'complete'
            }
        case steps.ASK_COMPLETE_RACE:
            const names = ['Hispanic/Latino', 'Asian', 'White', 'African American', 'Others'];
        return {
                formType: 'ANS_MULTICHECK',
                cbAction: {type: 'ADD_SIGNER_RACE'},
                section: 'complete',
                title:"Select None if you do not wish to disclose.",
                has_na: true,
                has_ok: true,
                text: names,
                btnText: 'Submit Application'
            }
        case steps.ASK_COMPLETE_DONE:
             return {
                formType: 'APPLICATION_COMPLETE',
                section: 'submitted'
            }
    }
}

export const toNextSection = (prevStep) => {
    if (prevStep == steps.ASK_COMPLETE_DONE) return true;
    
    return false;
}

export const getNextSection = () => {
    return "submitted"
}

export const refreshSteps = (prevStep, state) => {
     switch (prevStep) {
        case steps.ASK_COMPLETE_START:
            return [steps.ASK_COMPLETE_SSN]
        case steps.ASK_COMPLETE_SSN:
            return [steps.ASK_COMPLETE_NAME_SIGNATURE]
        case steps.ASK_COMPLETE_NAME_SIGNATURE:
            return [steps.ASK_COMPLETE_RACE]
        case steps.ASK_COMPLETE_RACE:
            return [steps.ASK_COMPLETE_DONE]
        case steps.ASK_COMPLETE_DONE:
            
    }
}
