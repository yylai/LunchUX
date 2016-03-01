export const steps = {
    ASK_CHILD_START: 'ASK_CHILD_START',
    ASK_CHILD_COUNT: 'ASK_CHILD_COUNT',
    ASK_CHILD_NAME: 'ASK_CHILD_NAME',
    ASK_CHILD_IS_STUDENT: 'ASK_CHILD_IS_STUDENT',
    ASK_CHILD_STATUSES: 'ASK_CHILD_STATUSES',
    ASK_PROCEED_TO_NEXT_CHILD: 'ASK_PROCEED_TO_NEXT_CHILD',
    ASK_CHILD_DONE: 'ASK_CHILD_DONE'
}
export const messages = (step, state) => {
    let childData = state.appData.child;
    let childSteps = state.appData.childSteps;
    let currentCid = 0;
    
    switch (step) {
        case steps.ASK_CHILD_START:
            return [['In this section, we will ask you a series of questions pertaining to the children in your household']
                ];
        case steps.ASK_CHILD_COUNT:
            return [
                ['How many children are in your household?']
                ];
        case steps.ASK_CHILD_NAME:
            const namemsg = [];
            
            //namemsg.push(["Great!"]);
            
            if (state.appData.childcount == 1) {
                namemsg.push(["One child? This will be a short application.."]);
            } else {
                
                //namemsg.push(["Ok let's continue..."]);
            }
            
            namemsg.push(["What is the child's full name?"]);
            return namemsg;
            
        case steps.ASK_CHILD_IS_STUDENT:
            currentCid = childSteps.current_child;
            const name = childData[currentCid].fName;
            
            const studentmsg = "Is " + name + " a student?";
            return [
                [studentmsg]
            ]
        case steps.ASK_CHILD_STATUSES:
            currentCid = childSteps.current_child;
            const statusName = childData[currentCid].fName;
            
            const statusmsg = `Does any of the below statuses apply for ${statusName}?`;
            return [
                [statusmsg]
            ]
        case steps.ASK_PROCEED_TO_NEXT_CHILD:
            const moreChildMsg = [];
             //we increment the aid at this step
             //so we check for aid+1
             currentCid = childSteps.current_child;
            if ((currentCid + 1) == state.appData.childcount) {
                moreChildMsg.push(["Ok, we are done with this section."]);
            } else {
                moreChildMsg.push(["Ok, let's move on to the next child..."]);
            }
            
            return moreChildMsg;
        case steps.ASK_CHILD_DONE:
           const donemsg = [];
            
            donemsg.push(["Let us move on to the next Section."]);
            
            return donemsg;
            
        default:
            return [
                ['I am speechless. You have found a bug in the child logic..']
            ]
    }
    
}


export const form = (step, state) => {
    
    let childData = state.appData.child;
    let childSteps = state.appData.childSteps;
    let currentCid = 0;
    
     switch (step) {
        case steps.ASK_CHILD_START:
        return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'GET_NEXT_STEP'},
            section: 'child',
            value: true
        };
        case steps.ASK_CHILD_COUNT:
            return {
            formType: 'ANS_SINGLE_INPUT',
            cbAction: {type: 'ADD_CHILD_COUNT'},
            section: 'child',
            title: 'Numbers only',
            value: 'number',
            placeholder: "# of children",
            min: 1
        }
        case steps.ASK_CHILD_NAME:
         currentCid = childSteps.current_child;
         return {
            formType: 'ANS_NAME',
            cbAction: {type: 'ADD_CHILD_NAME', cid: currentCid},
            section: 'child',
            title: 'The First and Last Name are required.',
        }
        case steps.ASK_CHILD_IS_STUDENT:
        currentCid = childSteps.current_child;
            return {
               formType: 'ANS_YN',
                cbAction: {type: 'ADD_CHILD_IS_STUDENT', cid: currentCid},
                section: 'child',
        }
        case steps.ASK_CHILD_STATUSES:
        currentCid = childSteps.current_child;
          return {
            formType: 'ANS_MULTICHECK',
            cbAction: {type: 'ADD_CHILD_STATUSES', cid: currentCid},
            section: 'child',
            title:"Select all statuses that apply (or select None).",
            has_na: true,
            text: ["Foster", "Migrant", "Runaway", "Head Start"],
            has_ok: true
        }
        case steps.ASK_PROCEED_TO_NEXT_CHILD:
            currentCid = childSteps.current_child;
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'INC_CHILD_INDEX', cid: currentCid},
            section: 'child',
            value: true
        };
        case steps.ASK_CHILD_DONE:
            currentCid = childSteps.current_child;
            return {
            formType: 'ANS_NEXT',
            cbAction: {type: 'RESET_CHILD_INDEX'},
            section: 'child',
            cid: currentCid,
            value: true
        }
        default:
            console.log('BAD form type for Child steps');
    }
}

export const toNextSection = (prevStep) => {
     if (prevStep == 'ASK_CHILD_DONE') return true;
    
    return false;
}

export const getNextSection = () => {
    return "assistance";   
}

export const refreshSteps = (prevStep, state) => {
     let childData = state.appData.child;
    let childSteps = state.appData.childSteps;
    let currentCid = 0;
    
    switch (prevStep) {
        case steps.ASK_CHILD_START:
            return [steps.ASK_CHILD_COUNT];
        case steps.ASK_CHILD_COUNT:
            return [steps.ASK_CHILD_NAME,steps.ASK_CHILD_IS_STUDENT ,steps.ASK_CHILD_STATUSES];
        case steps.ASK_CHILD_STATUSES:
           return [steps.ASK_PROCEED_TO_NEXT_CHILD]
        case steps.ASK_PROCEED_TO_NEXT_CHILD:
             currentCid = childSteps.current_child;
            
            if (currentCid == state.appData.childcount) {
                return [steps.ASK_CHILD_DONE];
            } else {
                return [steps.ASK_CHILD_NAME,steps.ASK_CHILD_IS_STUDENT ,steps.ASK_CHILD_STATUSES];
            }
            
        case steps.ASK_CHILD_DONE:
            //if somemore..?
        default:
            console.log('BAD form type for Child steps');
    }
}