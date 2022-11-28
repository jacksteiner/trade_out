import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

function* fetchContracts() {
    try {
        const contracts = yield axios.get('/api/contract');
        yield put({ type: 'SET_CONTRACTS', payload: contracts.data });
    } catch (error) {
        console.log('Error in fetchContracts (saga)', error);
        alert('Something went wrong fetching the contracts');
    }
}

function* fetchContractDetails(action){
    try{
        const contractDetails = yield axios.get(`/api/contract/${action.payload}`);
        yield put({ type: 'SET_CONTRACT_DETAILS', payload: contractDetails.data});
    } catch (error) {
        console.log('Error in fetchContractDetails (saga)', error);
        alert('Something went wrong fetching the selected contract details');
    }
}

function* fetchRecipientContract(action) {
    // payload is contract_key entered by recipient
    try {
        console.log('in fetchRecipientContract (saga)');
        const recipientContract = yield axios.get(`/api/recipient/${action.payload}`);
        yield put({ type: 'SET_RECIPIENT_CONTRACT', payload: recipientContract.data });
    } catch (error) {
        console.log('Error in fetchRecipientContract (saga)', error);
        alert('Something went wrong fetching the recipient contract');
    }     
}

function* addNewContract(action) {
    // payload is the newContractDetails object
    // the SendGrid email function is passed to addNewContract in the dispatch
    try {
        console.log('in addNewContract (saga)');
        yield axios.post('/api/contract', action.payload);
        yield put ({type: 'FETCH_CONTRACTS'});
        // call SendGrid email function, for example:
        // action.sendRecipientEmail();
    } catch (error) {
        console.log('Error in addNewContract (saga)', error);
        alert('Something went wrong creating a new contract.');
    }
}

function* contractSaga() {
    yield takeLatest('FETCH_CONTRACTS', fetchContracts);
    yield takeLatest('FETCH_CONTRACT_DETAILS', fetchContractDetails);
    yield takeLatest('FETCH_RECIPIENT_CONTRACT', fetchRecipientContract);
    yield takeLatest('ADD_NEW_CONTRACT', addNewContract);
}

export default contractSaga;
