import { all, fork } from "redux-saga/effects";
import calculatorSaga from "./calculator/saga";
// import userSaga from "./user/saga";
// import subscriptionSaga from "./calculator/saga";
// import paymentSaga from "./payment/saga";
// import alertSaga from "./alert/saga";

function* rootSaga() {
    yield all([
        fork(calculatorSaga),
        // fork(userSaga),
        // fork(subscriptionSaga),
        // fork(paymentSaga),
        // fork(alertSaga),
    ]);
}

export default rootSaga;