import {client, localClient, errorParser} from "../../utils/http-client";

type ConversionReqParams = {
  from: string;
  to: string;
  amount: number;
}

const fetchConversion = ({ from, to, amount }: ConversionReqParams) => {
  const params = new URLSearchParams({from, to, amount: amount.toString() })
  return client()
    .get(`/fx-rates?${params}`)
    .then((response) => response.data)
    .catch((response) => errorParser(response))
}

const fetchCurrencies = () => {
  return localClient()
      .get(`/currencies`)
      .then((response) => response.data)
      .catch((response) => errorParser(response))
}

export default { fetchConversion, fetchCurrencies }