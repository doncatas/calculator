import { put, call, select, takeLatest, all } from 'redux-saga/effects'
import {CalculatorActionTypes} from "./action";
import CalculatorService from './service'
import {Currency} from "../../types/calculator/currency";

export interface ConversionResponseGenerator{
  error?: boolean,
  message?: string,
  status?: string,
  from?: string,
  to?: string,
  rate?: string,
  fromAmount?: number,
  toAmount?: number,
}

export interface CurrenciesResponseGenerator{
  error?: boolean,
  message?: string,
  status?: string,
  currencies?: Array<Currency>,
}

function* fetchConversion({ payload }: any) {
  yield put({ type: CalculatorActionTypes.FETCH_CONVERSION_LOADING })
  const response:ConversionResponseGenerator = yield call(CalculatorService.fetchConversion, payload)
  if (!response.error) {
    yield put({ type: CalculatorActionTypes.FETCH_CONVERSION_SUCCESS, payload: response })
  } else {
    yield put({ type: CalculatorActionTypes.FETCH_CONVERSION_FAILURE, payload: response.message })
  }
}

function* fetchCurrencies() {
  yield put({ type: CalculatorActionTypes.FETCH_CURRENCIES_LOADING })
  const response:CurrenciesResponseGenerator = yield call(CalculatorService.fetchCurrencies)
  if (!response.error) {
    yield put({ type: CalculatorActionTypes.FETCH_CURRENCIES_SUCCESS, payload: response.currencies })
  } else {
    yield put({ type: CalculatorActionTypes.FETCH_CURRENCIES_FAILURE, payload: response.message })
  }
}

export default function* subscriptionSaga() {
  yield all([
    takeLatest(CalculatorActionTypes.FETCH_CONVERSION, fetchCurrencies),
    takeLatest(CalculatorActionTypes.FETCH_CONVERSION, fetchConversion),
  ]);
}
