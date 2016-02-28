import * as Welcome from './WelcomeSteps';
import * as Child from './ChildSteps';
import * as ChildIncome from './ChildIncomeSteps';
import * as Adult from './AdultSteps';
import * as Assistance from './AssistanceSteps';
import * as Complete from './CompleteSteps';

// const SINGLE_INPUT = {
//     formType: 'ANS_SINGLE_INPUT',
//     cbAction: 'GET_NEXT_STEP',
//     title: "Title",
//     placeholder: 'some placeholder',
//     value: 'number'
// };

// const NAME = {
//     formType: 'ANS_NAME',
//     cbAction: { type: 'GET_NEXT_STEP' },
//     title: 'TTTT'
// }
// const YN = {
//     formType: 'ANS_YN',
//     cbAction: { type: 'GET_NEXT_STEP' },
//     title: 'TTTT'
// }


const toMsgAction = (msg, section) => {
    return {
        type: 'SEND_MESSAGE',
        msgType: 'APP',
        text: msg,
        section: section
    }
}

const toFormAction = (formData, section) => {
    return {
        type: 'SEND_MESSAGE',
        msgType: 'FORM',
        section: section,
        ...formData
    }
}

export const sendInitialForm = (section) => {
    let action = {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: section,
            initial: true,
            value: true
        };
    return toFormAction(action, section);
}

export const toNextSection = (prevStep, state) => {
    //for now..
    if (Welcome.steps[prevStep]) return Welcome.toNextSection(prevStep, state);
    if (Child.steps[prevStep]) return Child.toNextSection(prevStep, state);
    if (ChildIncome.steps[prevStep]) return ChildIncome.toNextSection(prevStep, state);
    if (Adult.steps[prevStep]) return Adult.toNextSection(prevStep, state);
    if (Assistance.steps[prevStep]) return Assistance.toNextSection(prevStep, state);
    if (Complete.steps[prevStep]) return Complete.toNextSection(prevStep, state);
    return false;
}

export const getNextSection = (prevStep, state) => {
     if (Welcome.steps[prevStep]) return Welcome.getNextSection(prevStep, state);
     if (Child.steps[prevStep]) return Child.getNextSection(prevStep, state);
     if (ChildIncome.steps[prevStep]) return ChildIncome.getNextSection(prevStep, state);
     if (Adult.steps[prevStep]) return Adult.getNextSection(prevStep, state);
     if (Assistance.steps[prevStep]) return Assistance.getNextSection(prevStep, state);
     if (Complete.steps[prevStep]) return Complete.getNextSection(prevStep, state);
}

export const refreshSteps = (prevStep, state) => {
    //our workflow logic goes here
    let newSteps = [];
    
    if (Welcome.steps[prevStep]) newSteps = Welcome.refreshSteps(prevStep, state);
    if (Child.steps[prevStep]) newSteps = Child.refreshSteps(prevStep, state);
    if (ChildIncome.steps[prevStep]) newSteps = ChildIncome.refreshSteps(prevStep, state);
    if (Adult.steps[prevStep]) newSteps = Adult.refreshSteps(prevStep, state);
    if (Assistance.steps[prevStep]) newSteps = Assistance.refreshSteps(prevStep, state);
    if (Complete.steps[prevStep]) newSteps = Complete.refreshSteps(prevStep, state);
    
    return {
        type: 'REFRESH_STEPS',
        steps: newSteps
    }
}

export const resetGetNextStep = () => {
    return {
        type: 'GET_NEXT_STEP',
        value: false
    }
}

export const getNextStep = () => {
    return {
        type: 'GET_NEXT_STEP',
        value: true
    }
}



export const setPreviousStep = (nextStep) => {
    return {
        type: 'SET_PREVIOUS_STEP',
        value: nextStep
    }
}

const toActionMessages = (messages, section) => {
   return messages.map(m => {
            return toMsgAction(m, section)
   });
}

export const setCurrentSection = (section) => {
    return {
        type: 'SET_CURRENT_SECTION',
        value: section
    }
}


const DONE_STEP_NAMES_TO_SECTION_NAMES = {
    'ASK_WELCOME_DONE': 'welcome',
    'ASK_CHILD_DONE': 'child',
    'ASK_ASSISTANCE_DONE': 'assistance',
    'ASK_CHILD_INCOME_DONE': 'childincome',
    'ASK_ADULT_DONE': 'adult',
    'ASK_COMPLETE_DONE': 'complete'
}

const mapStepNameToSectionName = (step) => {
    let section = '';
    
    section = DONE_STEP_NAMES_TO_SECTION_NAMES[step];
    
    return section;
}

export const markAllComplete = (step) => {
     return {
        type: 'MARK_ALL_COMPLETED'
    }
}

export const markComplete = (step) => {
    let section = mapStepNameToSectionName(step);
    
     return {
        type: 'MARK_COMPLETED',
        value: section
    }
}

export const setNextStep = (nextSection) => {
    let nextStep = '';
    switch (nextSection) {
            case 'welcome':
                 nextStep = 'ASK_FIRST_TIME';
                 break;
            case 'child':
                 nextStep = 'ASK_CHILD_START';
                 break;
            case 'assistance':
                 nextStep = 'ASK_ASSISTANCE_START';
                 break;
            case 'childincome':
                 nextStep = 'ASK_CHILD_INCOME_START';
                 break;
            case 'adult':
                 nextStep = 'ASK_ADULT_START';
                 break;
            case 'complete':
                 nextStep = 'ASK_COMPLETE_START';
                 break;
        }
        
    return {
        type: 'SET_NEXT_STEP',
        value: nextStep
    }
}

//returns a list of message actions
export const sendMessages = (nextStep, state) => {
    
    if (Welcome.steps[nextStep]) return toActionMessages(Welcome.messages(nextStep, state), "welcome");
    if (Child.steps[nextStep]) return toActionMessages(Child.messages(nextStep, state), "child");
    if (Assistance.steps[nextStep]) return toActionMessages(Assistance.messages(nextStep, state), "assistance");
    if (ChildIncome.steps[nextStep]) return toActionMessages(ChildIncome.messages(nextStep, state), "childincome"); 
    if (Adult.steps[nextStep]) return toActionMessages(Adult.messages(nextStep, state), "adult");
    if (Complete.steps[nextStep]) return toActionMessages(Complete.messages(nextStep, state), "complete");
    
    //and so on...
}

export const sendForm = (nextStep, state) => {
    if (Welcome.steps[nextStep]) return toFormAction(Welcome.form(nextStep, state), "welcome");
    if (Child.steps[nextStep]) return toFormAction(Child.form(nextStep, state), "child");
    if (Assistance.steps[nextStep]) return toFormAction(Assistance.form(nextStep, state), "assistance");
    if (ChildIncome.steps[nextStep]) return toFormAction(ChildIncome.form(nextStep, state), "childincome");
    if (Adult.steps[nextStep]) return toFormAction(Adult.form(nextStep, state), "adult");
    if (Complete.steps[nextStep]) return toFormAction(Complete.form(nextStep, state), "complete");
    
        //and so on...
}

export const popStep = () => {
    return {
        type: 'POP_STEP'
    }
}

