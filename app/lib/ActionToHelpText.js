
const mapActionToHelpText = (action) => {
   //alert(action);
    
    switch (action) {
        case "ADD_FIRST_TIME":
            return {
                text: [["If you are applying for the first time, choose Yes."],["If you are returning to finish the application, choose No."]], type: 'p'
            }
        case "ADD_PIN":
            return {
                 text: [['Check your email for your PIN.']], type: 'p'
             }   
        case "ADD_CHILD_COUNT":
            return {
                text: [["Children age 18 or under and are supported with the household's income."]], type: 'p'
             }
         case "ADD_CHILD_IS_STUDENT":
            return {
                text: [["A student is anyone who is under the age of 18 and is enrolled in grade K-12."]], type: 'p'
             }
        case "ADD_CHILD_STATUSES":
            return {
                text: [["Foster children who live you may count as members of your household."], ["If you believe any child listed in this section may meet this description of Homeless, Migrant or Runaway."], ["Choose all that apply."]], type: 'p'
             }
        case "ADD_ASSISTANCE_PROGRAM":
            return {
                text: [['The Supplemental Nutrition Assistance Program (SNAP) helps low-income people and families buy the food they need for good health.'],['Temporary Assistance for Needy Families (TANF) is similar to SNAP in that it is a program that provide assistance for low-income families.'],
                ['Food Distribution Program on Indian Reservations (FDPIR)']], type: 'p'
            }
        case "ADD_CHILD_HAS_INCOME":
            return {
                text: [["Child income is money received from outside your household that is paid directly to your children."]], type: 'p'
             }
        case "ADD_CHILD_INCOME":
            return {
                text: [["List the amount that you normally get."],["For example, if you normally get $1000 each month, but you missed some work last month and only got $900, put down that you get $1000 per month."],["If you normally get overtime, include it, but not if you get it only sometimes."]], type: 'p'
             }
        case "ADD_TOTAL_HOUSE_COUNT":
            return {
                text: [['Do not count any adults living with you who does not share in the entire household income expenses.'], ['However, you do need to include any adults who are part of the household expenses but does not receive any income.']], type: 'p'
            } 
        case "ADD_ADULT_COUNT":
            return {
                text: [['Do not count any adults living with you who does not share in the entire household income expenses.'], ['However, you do need to include any adults who are part of the household expenses but does not receive any income.']], type: 'p'
            }
        case "ADD_SIGNER_RACE":
            return {
                text: [["This field is optional and does not affect your children's eligibility."]], type: 'p'
            }
        case "ADD_ADULT_INCOME":
            return {
                text: [['Earnings From Work  - Gross income is the amount earned before taxes and other deductions.'],
                ['Public Assistance - Money received from public assistance, welfare, charitable organizations, or other social assistance, and money provided to financially support the spouse.'],
                ["Pension / Retirement / IRA / Other -  Include Worker’s Comp, unemployment, strike benefits, SSI, VA benefits, disability benefits, regular contributions from people who do not live in your household. Report net income for self-owned business, farm, or rental income."]],
                type: 'li'
            }
        case "ADD_SIGNER_NAME_SIGNATURE":
        return {
                 text: [['If you have no permanent address, this does not make your children ineligible.']], type: 'p'
             }
        default:
             return {
                 text: [['On this panel, we will provide help and clarifications to terms that you will encounter during your application process.']], type: 'p'
             }
    }
}


export default mapActionToHelpText