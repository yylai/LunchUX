//must implement
//steps: {key: name}
//messages: {stepname: array of messages}
//form: {stepname: form}
//refreshSteps(prevStep, currentState)
//toNextSection(prevStep, currentState)
//getNextSection()

export const steps = {
    ASK_FIRST_TIME: 'ASK_FIRST_TIME',
    ASK_EMAIL_ADDRESS: 'ASK_EMAIL_ADDRESS',
    ASK_PIN: 'ASK_PIN',
    ASK_WELCOME_TUTORIAL: 'ASK_WELCOME_TUTORIAL',
    ASK_WELCOME_TUTORIAL_MULTI: 'ASK_WELCOME_TUTORIAL_MULTI',
    ASK_TUTORIAL_DONE: 'ASK_TUTORIAL_DONE',
    ASK_WELCOME_DONE: 'ASK_WELCOME_DONE'
}


//these key MUST be unique across all sections, ie. Welcome, Child info, etc. Limitation for now :P
export const messages = (step, state) => {
     switch (step) {
         case steps.ASK_FIRST_TIME:
            return [ ['In order to take you to the right application process, please tell us how you would like to proceed..'], 
                ['Is this a new application?']
            ]
        case steps.ASK_EMAIL_ADDRESS:
        return [ ["Before we get started, please provide your contact information."], 
                ['Sharing your contact information is optional, but will help us reach you quickly if we need to contact you.']
            ]
         case steps.ASK_PIN:
            return [
                ['To properly load your previously saved application, please provide your PIN.']
            ]
         case steps.ASK_WELCOME_TUTORIAL:
            return [
                ["Let's begin with a quick tutorial to show you the different actions you can take to quickly and easily fill out the application."],
                , ["Did you know that you can perform actions by using the keyboard as well? These 'hotkey's (when available) are shown right next to the buttons."],
                ['Give it a try, type the Y or N key ...']
            ]
        case steps.ASK_WELCOME_TUTORIAL_MULTI:
            return [
                ['Using these hotkeys can make the application process much easier and quicker.'],['Now, the hotkeys also apply to the options you see below. You can select any of the items by clicking or hitting the respective number on your keyboard.']
            ]
        case steps.ASK_WELCOME_DONE:
            return [
                ['You might have already noticed it, your answers are indicated in the blue boxes.'],["Ok, that wraps up our tutorial! We hope that these will make your application process much more pleasant and enjoyable."],["Let's get started with your application!"]
            ]
        default:
            return [
                ['I am speechless. You have found a bug in the welcome logic..']
               ]
     }
}
        
export const form = (step, state) => {
    
    switch (step) {
         case steps.ASK_FIRST_TIME:
            return {
            formType: 'ANS_YN',
            cbAction: {type: 'ADD_FIRST_TIME'},
            section: 'welcome'
        }
        case steps.ASK_EMAIL_ADDRESS:
        return {
            formType: 'ANS_EMAIL_ADDRESS',
            cbAction: {type: 'ADD_EMAIL_ADDRESS'},
            section: 'welcome'
        }
        case steps.ASK_WELCOME_TUTORIAL:
            return {
            formType: 'ANS_YN',
            cbAction: {type: 'ASK_WELCOME_TUTORIAL'},
            section: 'welcome'
        }
        case steps.ASK_WELCOME_TUTORIAL_MULTI:
            return  {
            formType: 'ANS_MULTICHECK',
            cbAction: {type: 'ASK_WELCOME_TUTORIAL_MULTI'},
            section: 'welcome',
            title:"Pick at least one item",
            has_na: true,
            text: ["First Item", "Second Item", "Third Item"],
            has_ok: true
        }
        case steps.ASK_PIN:
           return {
            formType: 'ANS_SINGLE_INPUT',
            cbAction: {type: 'ADD_PIN'},
            section: 'welcome',
            title: 'Enter your 6 digit Pin',
            value: 'number'
        }
        case steps.ASK_WELCOME_DONE:
           return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'welcome',
            value: true,
            text: "Start my Application!"
        }
    }
}
    
export const toNextSection = (prevStep) => {
    if (prevStep == steps.ASK_WELCOME_DONE) return true;
    
    return false;
}
    
export const getNextSection = () => {
    return "child";
}
    

//returns an array containing the next step/s
export const refreshSteps = (prevStep, state) => {
    
    switch (prevStep) {
        case steps.ASK_FIRST_TIME:
            if (state.appData.isNewApp) {
              return [steps.ASK_EMAIL_ADDRESS];
            } else {
                return [steps.ASK_PIN]; 
            }
         case steps.ASK_EMAIL_ADDRESS:
           return [steps.ASK_WELCOME_TUTORIAL, steps.ASK_WELCOME_TUTORIAL_MULTI];
        case steps.ASK_WELCOME_TUTORIAL_MULTI:
            return [steps.ASK_WELCOME_DONE];
        case steps.ASK_PIN:
            //change based on state
            return [steps.ASK_FIRST_TIME];
        case steps.ASK_WELCOME_DONE:
    }
    
    
}
    
    