import {combineReducers} from 'redux';
import form from './form';
import welcomeMessages from './welcomeMessages';
import childMessages from './childMessages';
import childIncomeMessages from './childIncomeMessages';
import getNextStep from './getNextStep';
import progress from './progress';
import appData from './appData';
import stepsMap from './stepsMap';
import previousStep from './previousStep';
import adultMessages from './adultMessages';
import assistanceMessages from './assistanceMessages';
import assistance from './assistance';
import signer from './signer';
import completeMessages from './completeMessages';
import childIncome from './childIncome';
import adultIncome from './adultIncome';
import request from 'superagent';

export default {
  previousStep,
  getNextStep,
  stepsMap,
  appData,
  progress,
  form,
  welcomeMessages,
  childMessages,
  childIncome,
  childIncomeMessages,
  adultIncome,
  adultMessages,
  assistanceMessages,
  assistance,
  signer,
  completeMessages
};