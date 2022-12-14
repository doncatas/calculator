import {Currency} from "../../types/calculator/currency";

const filteredCurrencies = (state: any, search: string) => {
  if (!search) {
    return state.calculator.currencies
  }

  return state.calculator.currencies.filter((item: Currency) => item.currency.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.currencyCode.toLowerCase().indexOf(search.toLowerCase()) > -1 || item.country.toLowerCase().indexOf(search.toLowerCase()) > -1)
}

export { filteredCurrencies }