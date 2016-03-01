
import req from 'superagent';

const InitialProgress = {
    'welcome': false,
    'child': false,
    'assistance': false,
    'childincome': false,
    'adult': false,
    'complete': false,
    current: ''
}

export default function progress(state = InitialProgress, action) {
    
    switch (action.type) {
        case 'SET_FINISH_LATER':
        
            //maybe not needed since we update a separate table..
            let finalState = Object.assign({}, state, {finish_later: true});
            
            // req.post('/api/finishlater')
            // .send({pin: '1234', section: state.current, email: 'yin@yin.com'})
            // .end(function (err, res) {
            //     console.log('return');
            //     console.log(res);
            // });
            
        case 'SET_CURRENT_SECTION':
            return Object.assign({}, state, {current: action.value});
        case 'MARK_COMPLETED':
            let newstate = Object.assign({}, state);
            newstate[action.value] = true;
            return newstate;
        case "MARK_ALL_COMPLETED":
            let exceptlaststep = {
                'welcome': true,
                'child': true,
                'assistance': true,
                'childincome': true,
                'adult': true
            }
            return Object.assign({}, state, {...exceptlaststep});
            
        case 'SEND_MESSAGE':
            if (action.msgType != 'FORM') return state;
            
            let {section} = action;
            
            if (section == 'submitted') {
                let allcompleted = {
                'welcome': true,
                'child': true,
                'assistance': true,
                'childincome': true,
                'adult': true,
                'complete': true
                }
                
            return Object.assign({}, state, {...allcompleted});
            }
            return state;
        default:
            return state;
    }
}