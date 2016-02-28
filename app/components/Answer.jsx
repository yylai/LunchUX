import React from 'react';


class ErrorMsgComponent extends React.Component {
    
    render() {
        const {msg} = this.props;
        return (
            <div className="error-message">
                <i className="fa fa-exclamation-circle icon-left"></i>{msg}
            </div>
        )
    }
    
}

const validateInput = (type, value, isRequired=true) => {
    
    const ok = {isValid: true, errorMsg: ''};
    const invalid = (msg) => {
        return {
            isValid: false,
            errorMsg: msg
        }
    }
    
    let result = {};
    switch (type) {
            case 'number':
                let v = parseInt(value, 10);
                
                if (v && v.toString() === '') {
                    return invalid('Please enter a number');
                }
                
                if (isNaN(v)) {
                    return invalid('Please enter only numbers.');
                }
                
                if (isRequired && v <= 0) {
                    return invalid('Please enter a number greater than 0.');
                }
                
               return ok;
            case 'float':
                //not used right now
                return ok;
            case 'string':
                if (!value) {
                    return invalid('Please enter a value');
                }
            
                return ok;
            default:
                return true;
        }
}


const renderEmailAddress = (form, nextStep, appmsgcb) => (
   <EmailAddressComponent cbAction={form.cbAction} cb={nextStep} />
)

class EmailAddressComponent extends React.Component {
  
   state = {
        isValid: true,
        currentComponent: 'email',
        errorMsg: '',
        contact: {}
    }
    
    componentDidUpdate() {
             window.setTimeout(()=>{this.refs.email.focus()},50); //hack to avoid instant focus and filled with hotkey value
    }
    
    
    toggleComponent = () => {
        if (this.state.currentComponent == 'email') {
            this.setState({currentComponent: 'address'});
        } 
    }
    
    handleEmailOk = (value) => {
        
        this.toggleComponent();
    }
    
     handleEnter = (e) => {
        if(e.keyCode != 13) return;
        
    }
    
    handleClick = (e) => {
        const {cbAction, cb} = this.props;
        cb(cbAction, {}, 'gha@yahoo.com');
    }
    
    renderEmail = () => {
        return (
                <div className="pure-form answerWrapper">
                    <h4 className="answer-header">Email (Optional)</h4>
                    <input ref='email' type='text' placeholder='Email' />
                    <button onClick={this.handleEmailOk} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button><span className="hotkey">Press <b>ENTER</b></span>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
                </div>
        )
    }
    
    renderAddress = () => {
        return (
                <div className="pure-form answerWrapper address">
                    <h4 className="answer-header">Address (Optional)</h4>
                    <div className="address-row">
                        <input ref='Address1' onBlur={this.handleBlur} type='text' placeholder='Street Address' />
                        <input ref='Address2' size='5' onBlur={this.handleBlur} type='text' placeholder='Apt #' />
                    </div>
                    <div className="address-row">
                        <input ref='City' onKeyDown={this.handleEnter} onBlur={this.handleBlur} type='text' placeholder='City' />
                        <input ref='State' size='4' onKeyDown={this.handleEnter} onBlur={this.handleBlur} type='text' placeholder='State' />
                        <input ref='Zip' size='6' onKeyDown={this.handleEnter} onBlur={this.handleBlur} type='text' placeholder='Zip' />
                    </div>
                    <button onClick={this.handleClick} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
                </div>
        )
    }
    
    render() {
        console.log(this.state);
        
        switch(this.state.currentComponent) {
            case 'email':
                return this.renderEmail();
            case 'address':
                return this.renderAddress();
            default:
                return null;
        }
    }
    
}
    

const renderSingle = (form, nextStep) => (
   <SingleInputComponent cbAction={form.cbAction} type={form.value} placeholder={form.placeholder} title={form.title} cb={nextStep} />
)

class SingleInputComponent extends React.Component {
    
    state = {
    isValid: true,
    errorMsg: ''
  }
  
  validate = () => {
      const {type} = this.props;
        const control = this.refs.single;
        
        const valResult = validateInput(type, control.value)
        
        this.setState({isValid: valResult.isValid});
        this.setState({errorMsg: valResult.errorMsg});
        
        return valResult.isValid;
  }
  
    handleEnter = (e) => {
        if(e.keyCode != 13) return;
        
        e.preventDefault();
        this.handleClick(e);
    }
    
    handleClick = (e) => {
        
        const isValid = this.validate();
        
        if (isValid) {
             const val = this.refs.single.value;
             const {cbAction, cb} = this.props;
             cb(cbAction, {value:val}, val);
            
        } else {
            e.preventDefault();
            return
        }
    }
    
    handleBlur = (e) => {
        const isValid = this.validate();
    }
    
    render() {
        const {type, title, placeholder} = this.props;
        return (
                <div className="pure-form answerWrapper">
                   { title ? <h4 className="answer-header">{title}</h4> : null }
                    <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} type='text' ref='single' placeholder={placeholder} />
                    <button onClick={this.handleClick} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button><span className="hotkey">Press <b>ENTER</b></span>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
                </div>
        )
    }
    
    componentDidMount() {
        this.refs.single.focus();
    }
}


const renderName = (form, nextStep) => (
    <NameComponent title={form.title} cbAction={form.cbAction} cb={nextStep} />
)

class NameComponent extends React.Component {
    
    state = {
        isValid: true,
        errorMsg: ''
    }
    
    getName = () => {
        return {
            fName: this.refs.first.value,
            mName: this.refs.middle.value,
            lName: this.refs.last.value,
        }
    }
    
    validate = () => {
        const fname = this.refs.first.value;
        const lname = this.refs.last.value;
        
        let valid = true;
        let msg = '';
        if (!fname && !lname) {
            msg = 'Please enter the First and Last Name.';
            valid = false;
        } else if (!fname) {
            msg = 'Please enter the First Name.';
            valid = false;
        } else if (!lname) {
            msg = 'Please enter the Last Name.';
            valid = false;
        }
        
        this.setState({isValid: valid});
        this.setState({errorMsg: msg});
        
        return valid;
    }
    
    handleBlur = (e) => {
        const isValid = this.validate();
    }
    
    handleEnter = (e) => {
        if(e.keyCode != 13) return;
        
        e.preventDefault();
        this.handleOk(e);
    }
    
    nameString = (pName) => {
        
        return `${this.refs.first.value} ${this.refs.last.value}`;
    }
    
    handleOk = (e) => {
        const isValid = this.validate();
        
        const {cbParent} = this.props;
        
        
        if (isValid) {
            
            if (cbParent) {
                cbParent(this.getName());
                return
            } else {
                 const {cbAction, cb} = this.props;
                cb(cbAction, this.getName(), this.nameString());     
            }
        }
    }
    
        
    render() {
         const {title} = this.props;
        return (
        <div className="pure-form answerWrapper">
                { title ? <h4 className="answer-header">{title}</h4> : null }
                <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} ref='first' type="text" placeholder="First" />
                <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} ref='middle' type="text" size="7" maxLength="1" placeholder="M. Initial" />
                <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} ref='last' type="text" placeholder="Last" />
                
                <button onClick={this.handleOk} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button><span className="hotkey">Press <b>ENTER</b></span>
                {
                    this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                }
        </div>
        )
    }
  
  componentDidMount() {
      window.setTimeout(()=>{this.refs.first.focus()},50); //hack to avoid instant focus and filled with hotkey value
    }
}



class YNComponent extends React.Component {
     handleClick = (value) => {
        
        const {cbAction, cb} = this.props;
        cb(cbAction, {value: value}, value ? 'Yes' : 'No');
    }
    
    handleYesClick = (e) => {
        e.preventDefault();
        this.handleClick(true);
    }
    
    handleNoClick = (e) => {
        e.preventDefault();
        this.handleClick(false);
    }
    
    handleYNKey = (e) => {
        e.preventDefault();
        const x = e.charCode || e.keyCode;
        const char = String.fromCharCode(x).toUpperCase();
        switch (char) {
            case 'Y':
                this.handleClick(true);
                return;
            case 'N':
                this.handleClick(false)
                return;
            default:
                return;
        }
    }
    
    componentWillMount() {
        document.addEventListener("keypress", this.handleYNKey, false);
    }
   
    componentDidMount() {
    }

   componentWillUnmount() {
      document.removeEventListener("keypress", this.handleYNKey, false);
   }
        
    render() {
         const {title} = this.props;
        return (
        <div className="pure-form answerWrapper answerYN">
                { title ? <h4 className="answer-header">{title}</h4> : null }
                <button type="button" onClick={this.handleYesClick} className="pure-button pure-button-primary">Yes</button>
                <button type="button" onClick={this.handleNoClick} className="pure-button pure-button-primary">No</button>
                <span className="hotkey">Press <b>Y</b> or <b>N</b></span>
            </div>
        )
        }
}

const renderYN = (form, nextStep, appmsgcb) => (
    <YNComponent appmsgcb={appmsgcb} cbAction={form.cbAction} cb={nextStep} />
)

const renderIncomeAmountFrequency = (form, nextStep, replycb) => (
    <IncomeAmountFrequency replycb={replycb} category={form.category} />
)

class IncomeAmountFrequency extends React.Component {
    
    state = {
        isValid: true
    }
        
    getValue = () => {
        return {
            amount: this.refs.amount,
            freq: this.ref.weekly
        }//test for now.. maybe can reuse multcheck component to be single check only
    }
    
    handleEnter = (e) => {
        if(e.keyCode != 13) return;
        
        e.preventDefault();
        this.handleOk(e);
    }
    
    handleOk = (e) => {
        e.preventDefault();
        const val = this.refs.amount.value;
        const freq = this.refs.cbl.getValues();
        let selected = '';
        Object.keys(freq).forEach((e) => {
          if(freq[e]) selected = e;
        });
        
        this.props.updatecb({amount: val, freq: selected});
    }
    
    render () {
        const {category, handleCancel} = this.props;
        const freq = ['Weekly', 'Bi-Weekly', 'Twice-Monthly', 'Monthly'];
        return (
            <div>
                <div className="pure-form answerWrapper">
                    <h4 className="answer-header">Enter Gross Income and select how often you receive this income</h4>
                    
                    <div className='answer-child-income'>
                    $ <input onKeyDown={this.handleEnter} onBlur={this.handleBlur} ref='amount' type="number" placeholder="Gross Income" />
                      <MultiCheckItemList single_item={true} has_hotkey={false} ref='cbl' has_na={false} text={freq} />
                    </div>
                      <div className="answer-child-income-done">
                        <ButtonComponent text="Add Income" onOk={this.handleOk} />
                        <button onClick={handleCancel} type="button" className="pure-button">Cancel</button>
                      </div>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
                </div>
            </div>
        )
    }
    
}




const renderAdultIncomeComponent = (form, nextStep, replycb, appmsgcb) => (
    <AdultIncomeComponent cbAction={form.cbAction} cb={nextStep} appmsgcb={appmsgcb} replycb={replycb} />
)

class AdultIncomeComponent extends React.Component {
    
    state = {
        isValid: true,
        currentComponent: ['category'],
        currentCat: '',
        currentSubCat: '',
        income: {}
    }
    
    componentDidMount() {
        if (this.state.currentComponent[0] == 'category') {
            this.props.appmsgcb(['Below are three categories of incomes.  Choose one...']);
        }
        
    }
    
    onDone = () => {
        //do call back and update income for this child
        const reply = [];
         Object.keys(this.state.income).forEach((cat) => {
            const msg = cat + ': $' + this.state.income[cat].amount + ' (' + this.state.income[cat].freq + ')'; 
            reply.push(msg);
                
        });
        
        const {cbAction, cb} = this.props;
        
        cb(cbAction, this.state.income, '');
    }
    
    replyIncome = () => {
        const reply = ['So far you have entered..']; //TODO add name if possible
        
        Object.keys(this.state.income).forEach((cat) => {
            const msg = cat + ': $' + this.state.income[cat].amount + ' (' + this.state.income[cat].freq + ')'; 
            reply.push(msg);
                
        });
        
        if (Object.keys(this.state.income).length == 1)
        reply.push('If you wish to change, click on the same category, we will use the updated values.');
        
        reply.push('If you have more income, select another category.');
        this.props.appmsgcb(reply);
        
    }
    
    //go down to more detail layer
    goForward = () => {
        const steps = this.state.currentComponent;
        if (steps[0] == 'category') {
            steps.unshift('sub-category');
            this.setState({currentComponent: steps});
        } else {
            if (this.state.currentComponent[0] == 'sub-category') {
                steps.unshift('details');
                this.setState({currentComponent: steps});
              }
        }
    }
    
    goBack = () => {
        const steps = this.state.currentComponent;
        steps.shift();
        this.setState({currentComponent: steps});
    }
    
    updateIncome = (result) => {
        console.log(result);
        
        const income = this.state.income;
        
        income[this.state.currentCat] = result;
        
        this.setState({income: income}, this.replyIncome);
        this.setState({currentComponent: ['category']}); //reset
    }
    
    render () {
        console.log(this.state);
        const category = ['Earnings from Work', 'Public Assistance/Alimony/Child Support', 'Pension/Retirement/All Others'];
        switch(this.state.currentComponent[0]) {
            case 'category':
                return this.renderCat();
            case 'sub-category':
                return this.renderSubCat();
            case 'details':
                return this.renderDetail('details here');
            default:
                return null;
        }
    }
    
    handleCatItemClick = (cat) => {
        const target = this.refs[cat];
        const val = target.getValue();
        
        //always check it?
        
        //navigate
        this.goForward()
        
        this.setState({currentCat: cat});
        
        this.props.appmsgcb(["Ok, for " + cat + ", choose one of the following income types that best describes this income."]);
    }
    
    renderCat = (cat) => {
        const category = ['Earnings From Work', 'Public Assistance/Alimony/Child Support', 'Pension/Retirement/Others'];
        return (
            <div>
             <div className="pure-form answerWrapper">
             <h4 className="answer-header">Choose the source of this income...</h4>
             <div className="answer-adult-income">
            { 
                category.map((c, i) => (
                    <MultiCheckItem ref={c} cb={this.handleCatItemClick.bind(this, c)} key={category + i} show_index={false} text={c} />         
                ))
            }
            </div>
            <div className="answer-adult-income-done">
                <ButtonComponent onOk={this.onDone} text="Done" has_hotkey={true} />
            </div>
            </div>
        </div>
        )
        
    }
    
    handleSubCatItemClick = (subcat) => {
        const target = this.refs[subcat];
        const val = target.getValue();
        
        //always check it?
        
        //navigate
        this.goForward()
        
        this.setState({currentSubCat: subcat});
        
        //provide hints on sub cat
        this.props.appmsgcb(["How much and how often do you receive for the income from " + subcat]);
        // switch (subcat) {
        //     case 'Earnings From Work':
        //         this.props.appmsgcb(["Earnings From Work could be one of the following types of income.."]);
        //         break;
        //     case 'Self-Employed':
        //         this.props.appmsgcb(["Self-Employed  let's enter the income from " + subcat]);
        //         break;
        //     case 'Strike Benefits':
        //         this.props.appmsgcb(["Ok let's enter the income from " + subcat]);
        //         break;
        //     case 'Military':
        //         this.props.appmsgcb(["Ok let's enter the income from " + subcat]);
        //         break;
            
        // }
    }
    
    getSubCat = (cat) => {
        switch (cat) {
            case 'Earnings From Work':
                return ['Salary/Wages', 'Self-Employed', 'Strike Benefits', 'Military'];
            case 'Public Assistance/Alimony/Child Support':
                return ['Unemployment', 'Workers Comp', 'SSI', 'Govt Cash Assistance', 'Ailmony', 'Child Support', 'Veteren'];
            case 'Pension/Retirement/Others':
                return ['penions','others'];
        }
    }
    
    renderSubCat = (cat) => {
        const subcategory = this.getSubCat(this.state.currentCat);
        console.log(subcategory);
        return (
            <div>
             <div className="pure-form answerWrapper">
                <h4 className="answer-header">Type of Income</h4>
                <div className="answer-adult-income">
                { 
                    subcategory.map((c, i) => (
                        <MultiCheckItem ref={c} cb={this.handleSubCatItemClick.bind(this, c)} key={i} show_index={false} text={c} />         
                    ))
                }
                </div>
            </div>
        </div>
        )
    }
    
    
    renderDetail = (cat) => {
        return (
            <div>
                <IncomeAmountFrequency updatecb={this.updateIncome} category={cat} replycb={this.props.replycb} />
            </div>
        )
    }
    
}

const renderSignerNameSignature = (form, nextStep, replycb, appmsgcb) => (
    <SignerNameSignatureComponent cbAction={form.cbAction} cb={nextStep} appmsgcb={appmsgcb} replycb={replycb} />
)

class SignerNameSignatureComponent extends React.Component {
    state = {
        isValid: true,
        currentComponent: 'name',
        errorMsg: '',
        name: {}
    }
    
    componentDidUpdate() {
             window.setTimeout(()=>{this.refs.signature.focus()},50); //hack to avoid instant focus and filled with hotkey value
    }
    
    toggleComponent = () => {
        if (this.state.currentComponent == 'name') {
            this.setState({currentComponent: 'sign'});
        } 
    }
    
    handleNameOk = (value) => {
        
        this.setState({name: value});
        this.toggleComponent();
    }
    
    handleSubmitSignature = (value) => {
        const {cbAction, cb} = this.props;
        const names = {
            name: this.state.name,
            signature: value
        }
        cb(cbAction, names, "SIGNED.");
    }
    
    renderName() {
        const {cbAction, cb} = this.props;
        return (
            <div>
                <NameComponent key='name' ref='name' cbParent={this.handleNameOk} title={'Enter Name of Adult completing the application'} cbAction={cbAction} cb={cb} />
            </div>
        )
   }
   
   renderSignature() {
       const d = new Date();
       const ds = d.toLocaleDateString();
        const {cbAction, cb} = this.props;
        return (
             <div className="pure-form answerWrapper">
                <h4 className="answer-header">Signature of Adult completing this application</h4>
                <input ref='signature' onKeyDown={this.handleEnter} onBlur={this.handleBlur} type="text" placeholder="Sign Here" />
                <input value={ds} ref='date' readOnly='readOnly' type="text" />
                <button onClick={this.handleSubmitSignature} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button><span className="hotkey">Press <b>ENTER</b></span>
                {
                    this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                }
            </div>
        )
   }
        
    render() {
        console.log(this.state);
        
        switch(this.state.currentComponent) {
            case 'name':
                return this.renderName();
            case 'sign':
                return this.renderSignature();
            default:
                return null;
        }
    }
    
    
}


const renderSignerSSN = (form, nextStep, replycb, appmsgcb) => (
    <SignerSSNComponent cbAction={form.cbAction} cb={nextStep} appmsgcb={appmsgcb} replycb={replycb} />
)

class SignerSSNComponent extends React.Component {
    
    state = {
        isValid: true,
        currentComponent: 'ask',
        errorMsg: ''
    }
    
     handleEnter = (e) => {
        if(e.keyCode != 13) return;
        const {appmsgcb} = this.props;
        
        
        const ssn = parseInt(this.refs.ssn.value);
        if (isNaN(ssn) || this.refs.ssn.value.length != 4) {
           this.setState({isValid: false, errorMsg: 'Only 4 digits for SSN is allowed'})
           return;
        }
        
        //go to nextStep
        const {cbAction, cb} = this.props;
        
        let ssnData = {
            has_ssn: true,
            ssn: this.refs.ssn.value
        }
        
        cb(cbAction, ssnData, ssn);
    }
    
     handleYNKey = (e) => {
        const x = e.charCode || e.keyCode;
        const char = String.fromCharCode(x).toUpperCase();
        switch (char) {
            case 'Y':
                this.handleYesClick();
                return;
            case 'N':
                this.handleNoClick();
                return;
            default:
                return;
        }
    }
    
    handleCancel = () => {
        this.toggleComponent();
    }
    
    toggleComponent = () => {
        if (this.state.currentComponent == 'ask') {
            this.setState({currentComponent: 'ssn'}); 
        } else if (this.state.currentComponent == 'ssn') {
            this.setState({currentComponent: 'ask'});   
        }
    }
    
    handleYesClick = () => {
        this.toggleComponent();
    }
    
    handleNoClick = () => {
        //go to nextStep
        const {cbAction, cb} = this.props;
        
        let ssn = {
            has_ssn: false,
            ssn: ''
        }
        
        cb(cbAction, ssn, 'No');
    }
    
    
    componentWillMount() {
        document.addEventListener("keypress", this.handleYNKey, false);
    }
   
    componentDidMount() {
    }
    
    componentDidUpdate() {
         if (this.state.currentComponent == 'ssn') {
             window.setTimeout(()=>{this.refs.ssn.focus()},50); //hack to avoid instant focus and filled with hotkey value
         }
    }

   componentWillUnmount() {
      document.removeEventListener("keypress", this.handleYNKey, false);
   }
   
   renderAsk() {
        return (
        <div className="pure-form answerWrapper answerYN">
            <button type="button" onClick={this.handleYesClick} className="pure-button pure-button-primary">Yes</button>
            <button type="button" onClick={this.handleNoClick} className="pure-button pure-button-primary">No</button>
            <span className="hotkey">Press <b>Y</b> or <b>N</b></span>
        </div>
        )
   }
   
   renderSSN() {
       return (
             <div className="pure-form answerWrapper">
                   <h4 className="answer-header">Enter the Last 4 digits of the SSN</h4>
                    <input type='text' size='5' maxLength='4' onKeyDown={this.handleEnter} onBlur={this.handleBlur} ref='ssn' placeholder='Last 4' />
                    <button onClick={this.handleSubmit} type="button" className="pure-button pure-button-primary">Ok<i className="fa fa-check icon-right"></i></button>
                    <button onClick={this.handleCancel} type="button" className="pure-button">Cancel</button>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
            </div>
        )
   }
        
    render() {
        console.log(this.state);
        
        switch(this.state.currentComponent) {
            case 'ask':
                return this.renderAsk();
            case 'ssn':
                return this.renderSSN();
            default:
                return null;
        }
    }
    
}

const renderAssistanceProgram = (form, nextStep, replycb, appmsgcb) => (
    <AssistanceProgramComponent cbAction={form.cbAction} cb={nextStep} appmsgcb={appmsgcb} replycb={replycb} />
)

class AssistanceProgramComponent extends React.Component {
     componentWillMount() {
       document.addEventListener("keypress", this.handleKey, false);
    }
   
    componentDidMount() {
    }

   componentWillUnmount() {
      document.removeEventListener("keypress", this.handleKey, false);
   }
    
     state = {
        isValid: true,
        currentComponent: 'program',
        currentProg: ''
    }
    
     toggleComponent = () => {
        if (this.state.currentComponent == 'program') {
            this.setState({currentComponent: 'casenumber'}); 
        } else if (this.state.currentComponent == 'casenumber') {
            this.setState({currentComponent: 'program'});   
        }
    }
    
     validateCaseNumber = () => {
      const {type} = this.props;
        const control = this.refs.caseNumber;
        
        const valResult = validateInput(type, control.value)
        
        this.setState({isValid: valResult.isValid});
        this.setState({errorMsg: valResult.errorMsg});
        
        return valResult.isValid;
  }
  
  handleKey = (e) => {
       const x = e.charCode || e.keyCode;
       const char = String.fromCharCode(x).toUpperCase();
       const num = parseInt(char);
       let index = 9999; //fake number so it will never find the ref
       if (!isNaN(num)) {
           index = num - 1;
       }
       
       const {appmsgcb} = this.props;
       
       const programs = ['TANF', 'SNAP', 'FDPIR', 'None'];
         
       const key = programs[index];
       
       if (this.refs[key]) {
           const item = this.refs[key];
           const prev = item.isChecked();
           item.setChecked(!prev);
           if (key == 'None') return;
           this.toggleComponent();
           this.setState({currentProg: key});
           this.props.appmsgcb(["Ok let's enter the case number for " + key]);
       }
    }
    
    handleCheckItemClick = (prog) => {
        
        const target = this.refs[prog];
        
        if (prog == 'None') return;
        
        //swap components
        this.toggleComponent();
        this.setState({currentProg: prog});
        
        this.props.appmsgcb(["Ok let's enter the case number for " + prog]);
    }
    
    render () {
        console.log(this.state);
        
        switch(this.state.currentComponent) {
            case 'program':
                return this.renderProgram();
            case 'casenumber':
                return this.renderCaseNumber(this.state.currentProg);
            default:
                return null;
        }
    }
    
    getTitle () {
        switch(this.state.currentProg) {
            case 'SNAP':
                return 'Your SNAP Case Number should be a 7-9 character code.';
            case 'TANF':
                return 'Your TANF Case Number should be a 7-9 character code.';
            case 'FDPIR':
                return 'Enter your Case Number';    
            default:
                return 'Enter your Case Number';
        }
    }
    
    handleOk = () => {
        //none selected
        const {cbAction, cb} = this.props;
        
        let noneprogram = {
            has_program: false,
            caseNumber: '',
            programName: ''
        }
        
        console.log(noneprogram);
        cb(cbAction, noneprogram, 'None');
    }
    
    handleSubmit = () => {
         const {cbAction, cb} = this.props;
         let data = {
            has_program: true,
            caseNumber: this.refs.caseNumber.value,
            programName: this.state.currentProg
        }
        
        console.log(data);
        cb(cbAction, data, this.refs.caseNumber.value);
        
    }
    
    handleEnter = (e) => {
        if(e.keyCode != 13) return;
        this.handleSubmit();
    }
    
    handleBlur = () => {
         const {appmsgcb} = this.props;
         
    }
    
    handleCancel = () => {
        this.toggleComponent();
        this.setState({currentProg: ''});
        const {appmsgcb} = this.props;
    }
    
     componentDidUpdate() {
         if (this.state.currentComponent == 'casenumber') {
             window.setTimeout(()=>{this.refs.caseNumber.focus()},50); //hack to avoid instant focus and filled with hotkey value
         }
    }
    
    renderCaseNumber = (prog) => {
        return (
             <div className="pure-form answerWrapper">
                   <h4 className="answer-header">{this.getTitle()}</h4>
                    <input maxLength="9" onKeyDown={this.handleEnter} onBlur={this.handleBlur} type='text' ref='caseNumber' placeholder='Enter your case#' />
                    <button onClick={this.handleSubmit} type="button" className="pure-button pure-button-primary">Next<i className="fa fa-check icon-right"></i></button>
                    <button onClick={this.handleCancel} type="button" className="pure-button">Cancel</button>
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
            </div>
        )
    }
    
    renderProgram = () => {
        const programs = ['TANF', 'SNAP', 'FDPIR', 'None'];
        return (
        <div>
             <div className="pure-form answerWrapper">
             <h4 className="answer-header">Choose your Assistance Program or select None if you do not have any.</h4>
            { 
                programs.map((c, i) => (
                    <MultiCheckItem ref={c} cb={this.handleCheckItemClick.bind(this, c)} key={'item' + i} show_index={false} text={`${i+1}. ${c}`} />         
                ))
            }
            <ButtonComponent onOk={this.handleOk} text="Ok" has_hotkey={false} />
            </div>
        </div>
        )
    }
}

const renderChildIncomeComponent = (form, nextStep, replycb, appmsgcb) => (
    <ChildIncomeComponent cbAction={form.cbAction} cb={nextStep} appmsgcb={appmsgcb} replycb={replycb} />
)

//todo add validations
class ChildIncomeComponent extends React.Component {
    
    state = {
        isValid: true,
        currentComponent: 'category',
        currentCat: '',
        income: {}
    }
    
    toggleCat = () => {
        if (this.state.currentComponent == 'category') this.setState({currentComponent: 'details'});
        if (this.state.currentComponent == 'details') this.setState({currentComponent: 'category'});
    }
    
    handleCancel = () => {
        this.toggleCat();
    }
    
    onDone = () => {
        //do call back and update income for this child
        const reply = [];
         Object.keys(this.state.income).forEach((cat) => {
            const msg = cat + ': $' + this.state.income[cat].amount + ' (' + this.state.income[cat].freq + ')'; 
            reply.push(msg);
                
        });
        
        const {cbAction, cb} = this.props;
        
        cb(cbAction, this.state.income, '');
    }
    
    handleCheckItemClick = (cat) => {
        const target = this.refs[cat];
        
        const val = target.getValue();
        
        //always check it?
        
        //swap components
        this.toggleCat();
        this.setState({currentCat: cat});
        
        this.props.appmsgcb(["Ok let's enter the income from " + cat]);
    }
    
    render () {
        console.log(this.state);
        const category = ['Wages', 'Social Security', 'Outside Household', 'Other'];
        switch(this.state.currentComponent) {
            case 'category':
                return this.renderCat();
            case 'details':
                return this.renderDetail(this.state.currentCat);
            default:
                return null;
        }
    }
    
    replyIncome = () => {
        const reply = ['So far you have entered..']; //TODO add name if possible
        
        Object.keys(this.state.income).forEach((cat) => {
            const msg = cat + ': $' + this.state.income[cat].amount + ' (' + this.state.income[cat].freq + ')'; 
            reply.push(msg);
                
        });
        
        if (Object.keys(this.state.income).length == 1)
        reply.push('If you wish to change, click on the same category, we will use the updated values.');
        
        reply.push('If you have more income, select another category.');
        this.props.appmsgcb(reply);
        
    }
    
    updateIncome = (result) => {
        console.log(result);
        
        const income = this.state.income;
        
        income[this.state.currentCat] = result;
        
        this.setState({income: income}, this.replyIncome);
        this.toggleCat();
    }
    
    renderDetail = (cat) => {
        return (
            <div>
                <IncomeAmountFrequency handleCancel={this.handleCancel} updatecb={this.updateIncome} category={cat} replycb={this.props.replycb} />
            </div>
        )
    }
    
    renderCat = () => {
        const category = ['Wages', 'Social Security', 'Outside Household', 'Other'];
        return (
        <div>
             <div className="pure-form answerWrapper">
             <h4 className="answer-header">Choose the income category</h4>
            { 
                category.map((c, i) => (
                    <MultiCheckItem index={i} ref={c} cb={this.handleCheckItemClick.bind(this, c)} key={i} show_index={true} text={c} />         
                ))
            }
            <ButtonComponent onOk={this.onDone} text="Done" has_hotkey={true} />
            </div>
        </div>
        )
    }
    
    
    
}

class MultiCheckItem extends React.Component {
    state = {
        isChecked: false
    }
    
    handleClick = (e) => {
        if (this.props.cb) {
            this.setState({isChecked: !this.state.isChecked}, this.props.cb);
        } else {
            this.setState({isChecked: !this.state.isChecked});     
        }
    }
    
    isChecked = () => {
        return this.state.isChecked;
    }
    
    getValue = () => {
        return this.props.text;
    }
    
    setChecked = (val) => {
       this.setState({isChecked: val})
    }
    
    componentWillMount() {
        
    }
    
    getText = () => {
        const content = this.props.show_index ?  (this.props.index + 1) + '. ' + this.props.text : this.props.text;
        return content
    }
    
    render () {
        return (
        <span>
            {this.state.isChecked ? 
            <button type="button" onClick={this.handleClick} className="pure-button btn-multi-item-checked">{this.getText()}</button> :
            <button type="button" onClick={this.handleClick} className="pure-button btn-multi-item">{this.getText()}</button>
            }
        </span>
        )
    }
}

class ButtonComponent extends React.Component {

    render() {
        const {onOk, text, has_hotkey} = this.props;
        
        return (
            <span>
             <button onClick={onOk} type="button" className="pure-button pure-button-primary">{text}<i className="fa fa-check icon-right"></i></button>{has_hotkey ? <span className="hotkey">Press <b>ENTER</b></span> : null}
           </span>
        )
    }
}

const renderMulti = (form, nextStep) => (
    <MultiCheckComponent btnText={form.btnText} has_ok={form.has_ok} title={form.title} has_na={form.has_na} text={form.text} cbAction={form.cbAction} cb={nextStep} />
)

class MultiCheckComponent extends React.Component {
    
    state = {
        isValid: true
    }
    
    componentWillMount() {
        document.addEventListener("keypress", this.handleKey, false);
        if (this.props.has_ok) document.addEventListener("keydown", this.handleEnter, false);
    }
   
    componentDidMount() {
    }

   componentWillUnmount() {
      document.removeEventListener("keypress", this.handleKey, false);
      if (this.props.has_ok) document.removeEventListener("keydown", this.handleEnter, false);
   }
    
    validate = () => {
        
        //simple check for now, as long as one is selected, we are good
       let anyTrue = false;
       this.props.text.forEach((t, i) => {
          anyTrue = anyTrue || this.refs['item' + i].isChecked();
        });
        
        if (this.refs.none) anyTrue = anyTrue || this.refs.none.isChecked();
        
         this.setState({isValid: anyTrue});
         anyTrue ? this.setState({errorMsg: ''}) : this.setState({errorMsg: 'Please choose at least one.'});
        
        return anyTrue;
  }
  
    getValues = () => {
        
        let values = {};
        
        //not too robust if order happen to change but props is fixed so should be ok..
        this.props.text.forEach((t, i) => {
            values[t] = this.refs['item' + i].isChecked();
        });
        
        if (this.refs.none) values['None'] = this.refs.none.isChecked();
        
        return values;
    }
    
    handleOk = (e) => {
        
        const isValid = this.validate();
        if (isValid) {
             const {cbAction, cb} = this.props;
             const rtnVal = this.getValues();
             const reply = Object.keys(rtnVal).filter( k => {
                 return rtnVal[k];
             }).join(', ');
             
             //const {add_child_has_income, cids} = this.props;
             
             cb(cbAction, this.getValues(), reply);
        } else {
            e.preventDefault();
            return
        }
        
    }
    
    handleKey = (e) => {
       const x = e.charCode || e.keyCode;
       const char = String.fromCharCode(x).toUpperCase();
       const num = parseInt(char);
       let index = 9999; //fake number so it will never find the ref
       if (!isNaN(num)) {
           index = num - 1;
       }
       if (this.refs['item' + index]) {
           const item = this.refs['item' + index];
           const prev = item.isChecked();
           item.setChecked(!prev);
       }
       
       if (this.props.has_na) {
           //check for None. None is last item so its index = length
           if (index == this.props.text.length) {
               const item = this.refs.none;
               //just to be on safe side
               if (item) {
                    const prev = item.isChecked();
                    item.setChecked(!prev);    
               }
           }
       }
        
    }
    
    
    
    handleEnter = (e) => {
        if(e.keyCode != 13) return;
        this.handleOk(e);
    }
    
    handleNoneClick = (e) => {
         this.setState({isValid: true});
        this.props.text.forEach((t, i) => {
          this.refs['item' + i].setChecked(false);
        });
    }
    
    handleItemClick = (e) => {
        this.setState({isValid: true});
        if(this.refs.none) this.refs.none.setChecked(false);
    }
    
    render() {
        const {title, has_na, text, has_ok} = this.props;
        let btnText = this.props.btnText;
        
        if (!btnText) btnText = 'Ok';
        return (
            <div>
                <div className="pure-form answerWrapper">
                    { title ? <h4 className="answer-header">{title}</h4> : null }
                    
                    {
                        text.map((t, i) => (
                            <MultiCheckItem show_index={true} cb={this.handleItemClick} key={i} ref={'item' + i} text={t} index={i} />        
                        ))
                    }
                    { has_na ? <MultiCheckItem cb={this.handleNoneClick} show_index={true} ref='none' text='None' index={this.props.text.length} /> : null}
                    
                    { has_ok ? <ButtonComponent has_hotkey={true} text={btnText} onOk={this.handleOk} /> : null}
                    {
                        this.state.isValid ? null : <ErrorMsgComponent msg={this.state.errorMsg} /> 
                    }
                </div>
                
            </div>
        )
    }
  
  componentDidMount() {
      
  }
}

const renderMultiCheckItemList = (form, nextStep) => (
    <MultiCheckItemList has_hotkey={form.has_hotkey} has_na={form.has_na} text={form.text} single_item={true}  />
)

class MultiCheckItemList extends React.Component {
    
     state = {
        isValid: true
    }
    
    uncheckAllBut = (targetIdx) => {
         this.props.text.forEach((t, i) => {
            if(targetIdx != i) this.refs['item' + i].setChecked(false);
        });
    }
    
    componentWillMount() {
        if (this.props.has_hotkey) document.addEventListener("keypress", this.handleKey, false);
    }
   
    componentDidMount() {
    }

   componentWillUnmount() {
      if (this.props.has_hotkey) document.removeEventListener("keypress", this.handleKey, false);
   }
   
   handleNoneClick = (e) => {
         e.preventDefault();
         this.setState({isValid: true});
        this.props.text.forEach((t, i) => {
          this.refs['item' + i].setChecked(false);
        });
    }
   
    handleKey = (e) => {
       const x = e.charCode || e.keyCode;
       const char = String.fromCharCode(x).toUpperCase();
       const num = parseInt(char);
       let index = 9999; //fake number so it will never find the ref
       if (!isNaN(num)) {
           index = num - 1;
       }
       
       const key = 'item' + index;
       if (this.refs[key]) {
           const item = this.refs[key];
           const prev = item.isChecked();
           item.setChecked(!prev);
           if (this.props.has_na && item.isChecked()) {
               this.refs.none.setChecked(false);
           }
           if (this.props.single_item) {
                this.uncheckAllBut(index);
           }
       }
       
       if (this.props.has_na) {
           //check for None. None is last item so its index = length
           if (index == this.props.text.length) {
               const none_item = this.refs.none;
               //just to be on safe side
               if (none_item) {
                    const prev = none_item.isChecked();
                    none_item.setChecked(!prev);
                    if (none_item.isChecked()) {
                         this.props.text.forEach((t, i) => {
                         this.refs['item' + i].setChecked(false);
                        });
                    }
               }
           }
       }
        
    }
    
     getValues = () => {
        
        let values = {};
        
        //not too robust if order happen to change but props is fixed so should be ok..
        this.props.text.forEach((t, i) => {
            values[t] = this.refs['item' + i].isChecked();
        });
        
        if (this.refs.none) values['None'] = this.refs.none.isChecked();
        
        return values;
    }
    
    handleItemClick = (e) => {
        //e.preventDefault();
        //not always true.. fix bug later
        this.setState({isValid: true});
        if(this.refs.none) this.refs.none.setChecked(false);
    }
    
    hasError = () => {
        return true;
    }
    
    render() {
        const {has_na, text} = this.props;
        return (
            <span>
                    {
                        text.map((t, i) => (
                            <MultiCheckItem cb={this.handleItemClick} key={i} ref={'item' + i} text={t} index={i} />        
                        ))
                    }
                    { has_na ? <MultiCheckItem cb={this.handleNoneClick} ref='none' text='None' index={this.props.text.length} /> : null}
            </span>
        )
    }
    
}


const renderNext = (form, nextStep) => (
    <NextComponent text={form.text} title={form.title} cbAction={form.cbAction} cb={nextStep} />
)

class NextComponent extends React.Component {
    
    componentWillMount() {
        document.addEventListener("keydown", this.handleEnter, false);
    }
   
    componentDidMount() {
    }

   componentWillUnmount() {
      document.removeEventListener("keydown", this.handleEnter, false);
   }
   
   handleEnter = (e) => {
        if(e.keyCode != 13) return;
        
        e.preventDefault();
        this.handleOk(e);
    }
    
    handleOk = (e) => {
        const {cbAction, cb, text} = this.props;
        const replytext = text ? text : 'Next';
        //future we use the prop text
        cb(cbAction, {value: true}, 'Next');
    }
        
    render() {
        const {title, text} = this.props;
        const btnText = text ? text : 'Next';
        return (
       <div className="pure-form answerWrapper">
                { title ? <h4 className="answer-header">{title}</h4> : null }
                <button type="button" onClick={this.handleOk} className="pure-button pure-button-primary">{btnText} <i className="fa fa-check icon-right"></i></button><span className="hotkey">Press <b>ENTER</b></span>
        </div>
    )
    }
}



export default ({form, nextStep, replycb, appmsgcb}) => {
    
    console.log('answer:')
    console.log(form.formType)
    if (!form || Object.keys(form).length == 0) {
        return (
            <div className="pure-form answerWrapper">
                No Form No Content
            </div>
        )
    }
    switch (form.formType) {
        case 'ANS_SINGLE_INPUT':
            return renderSingle(form, nextStep);
        case 'ANS_NAME':
            return renderName(form, nextStep);
        case 'ANS_YN':
            return renderYN(form, nextStep, appmsgcb);
        case 'ANS_MULTICHECK':
            return renderMulti(form, nextStep);
        case 'ANS_NEXT':
            return renderNext(form, nextStep);
        case 'ANS_CHILD_INCOME':
            return renderChildIncomeComponent(form, nextStep, replycb, appmsgcb)
        case 'ANS_ADULT_INCOME':
             return renderAdultIncomeComponent(form, nextStep, replycb, appmsgcb);
        case 'ANS_ASSISTANCE_PROGRAM':
            return renderAssistanceProgram(form, nextStep, replycb, appmsgcb);
        case 'ANS_SIGNER_SSN':
            return renderSignerSSN(form, nextStep, replycb, appmsgcb);
        case 'ANS_SIGNER_NAME_SIGNATURE':
            return renderSignerNameSignature(form, nextStep, replycb, appmsgcb)
        case 'ANS_EMAIL_ADDRESS':
            return renderEmailAddress(form, nextStep);
        default:
            return (
                null
            // <div className="pure-form answerWrapper">
            //         No Form Type No Content
            // </div>
            )
    }
    
  
}