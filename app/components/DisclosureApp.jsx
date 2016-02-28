import React from 'react';
import MessagesContainer from '../containers/MessagesContainer';
import AnswerContainer from '../containers/AnswerContainer';
import { connect } from 'react-redux'
import * as core from '../lib/core'
import { Router, Route, browserHistory } from 'react-router';

class DisclosureApp extends React.Component {
  
   componentWillMount() {
  }
  
  componentDidMount() {
  }
  
  onStart = () => {
       browserHistory.push('welcome');
  }
  
  
  render() {
      return (
        <div>
        <div className="disclosure">
            <h1 className="section-header">Disclosures</h1>
            <h3>USDA Non-Discrimination Statement</h3>
            <p>
            In accordance with Federal civil rights law and U.S. Department of Agriculture (USDA) civil rights regulations and policies, the USDA, its Agencies, offices, and employees, and institutions participating in or administering USDA programs are prohibited from discriminating based on race, color, national origin, sex, disability, age, or reprisal or retaliation for prior civil rights activity in any program or activity conducted or funded by USDA.
            </p>
            <p>
            Persons with disabilities who require alternative means of communication for program information (e.g. Braille, large print, audiotape, American Sign Language, etc.), should contact the Agency (State or local) where they applied for benefits. Individuals who are deaf, hard of hearing or have speech disabilities may contact USDA through the Federal Relay Service at (800) 877-8339. Additionally, program information may be made available in languages other than English.
            </p>
            <p>
            To file a program complaint of discrimination, complete the USDA Program Discrimination Complaint Form, (AD-3027) found online at: <a href='http://www.ascr.usda.gov/complaint_filing_cust.html' target='_none'>http://www.ascr.usda.gov/complaint_filing_cust.html</a>, and at any USDA office, or write a letter addressed to USDA and provide in the letter all of the information requested in the form. To request a copy of the complaint form, call (866) 632-9992. Submit your completed form or letter to USDA by:
            </p>
            <p>(1) Mail: U.S. Department of Agriculture<br />
                Office of the Assistant Secretary for Civil Rights<br />
                1400 Independence Avenue, SW<br />
                Washington, D.C. 20250-9410;<br /> 
            </p>
            <p>    (2) Fax: (202) 690-7442; or<br /></p>
             <p>(3) Email: <a href='mailto:program.intake@usda.gov'>program.intake@usda.gov</a>.<br /></p>
              <p>This institution is an equal opportunity provider.</p>
            <h3>Use of Information Statement</h3>
            <p>“The Richard B. Russell National School Lunch Act requires the information on this application. You do not have to give the information, but if you do not submit all needed information, we cannot approve your child for free or reduced price meals. You must include the last four digits of the social security number of the adult household member who signs the application. The social security number is not required when you apply on behalf of a foster child or you list a Supplemental Nutrition Assistance Program (SNAP), Temporary Assistance for Needy Families (TANF) Program or Food Distribution Program on Indian Reservations (FDPIR) case number or other FDPIR identifier for your child or when you indicate that the adult household member signing the application does not have a social security number. We will use your information to determine if your child is eligible for free or reduced price meals, and for administration and enforcement of the lunch and breakfast programs.</p>
            <p>We may share your eligibility information with education, health, and nutrition programs to help them evaluate, fund, or determine benefits for their programs, auditors for program reviews, and law enforcement officials to help them look into violations of program rules.”</p>
            
            <h3>Attesting Statement – to be included directly above the signature block of the certifying adult</h3>
            <p>“The person signing is furnishing true information and to advise that person that the application is being made in connection with the receipt of Federal funds;</p>
            <p>School officials may verify the information on the application; and</p> 
            <p>Deliberate misrepresentation of the information may subject the applicant to prosecution under State and Federal statutes.”</p>
             
             <h3>Children’s Racial & Ethnic Identities Question –an answer is not required</h3>
             <p>“We are required to ask for information about your children’s race and ethnicity. This information is important and helps to make sure we are fully serving our community. Responding to this section is optional and does not affect your children’s eligibility for free or reduced price meals.</p>
             <p>Ethnicity: Hispanic or Latino, Not Hispanic or Latino</p>
             <p>Race: American Indian or Alaskan Native, Asian, Black or African American, Native Hawaiian or Other Pacifi­c Islander, White”</p>
        </div>
        <div className="disclosure-start">
            <button type="button" onClick={this.onStart} className="pure-button pure-button-primary">Start Application<i className="fa fa-check icon-right"></i></button>
        </div>
        </div>
    )
  }
}

export default DisclosureApp