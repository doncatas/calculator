import { CalculatorActionTypes } from './action'

const INITIAL_STATE = {
  currencies: [],
  currenciesLoading: false,
  currenciesError: null,
  conversion: null,
  conversionLoading: false,
  conversionError: null,
}

export default function reducer(state = INITIAL_STATE, action: any) {
  switch (action.type) {
    case CalculatorActionTypes.FETCH_CURRENCIES_LOADING:
      return { ...state, currenciesLoading: true, currenciesError: null };
    case CalculatorActionTypes.FETCH_CURRENCIES_SUCCESS:
      return { ...state, currenciesLoading: false, currencies: action.payload };
    case CalculatorActionTypes.FETCH_CURRENCIES_FAILURE:
      return { ...state, currenciesLoading: false, conversion: null, currenciesError: action.payload };
    case CalculatorActionTypes.FETCH_CONVERSION_LOADING:
      return { ...state, conversionLoading: true, conversionError: null };
    case CalculatorActionTypes.FETCH_CONVERSION_SUCCESS:
      return { ...state, conversionLoading: false, conversion: action.payload };
    case CalculatorActionTypes.FETCH_CONVERSION_FAILURE:
      return { ...state, conversionLoading: false, conversion: null, conversionError: action.payload };
    case CalculatorActionTypes.RESET:
      return INITIAL_STATE;
    default:
      return state;
  }
}