import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {useHistory} from 'react-router-dom';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const PartyType = () => {

  const dispatch = useDispatch();
  const history = useHistory();
  const newContractDetails = useSelector(store => store.contract.newContractDetails);

  const [secondParty, setSecondParty] = useState('');

  // firstPartyType is set in newContractDetails reducer, secondParty is set to opposite of firstPartyType
  const handleChangeFor = (key) => (event) => {
    console.log('in handleChangeFor', event.target.value);
    // secondParty set to the opposite of the firstPartyType
    if (event.target.value === 'buyer') {
      setSecondParty('seller');
    } else if (event.target.value === 'seller') {
      setSecondParty('buyer');
    }
    // dispatching to newContractDetails reducer
    dispatch({type: 'SET_NEW_CONTRACT_DETAILS', payload: {...newContractDetails, [key]: event.target.value}});
  }

  // secondPartyType is set in newContractDetails reducer, user is pushed to CreateContractDetails
  const handleChangeForSecondParty = (contractDetail, partyType) => {
    console.log('in handleChangeForSecondParty', contractDetail, partyType);
    if (partyType === 'buyer') {
      dispatch({type: 'SET_NEW_CONTRACT_DETAILS', payload: {...newContractDetails, [contractDetail]: 'buyer'}});
    } else if (partyType === 'seller') {
      dispatch({type: 'SET_NEW_CONTRACT_DETAILS', payload: {...newContractDetails, [contractDetail]: 'seller'}});
    }
    // user is pushed to CreateContractDetails
    history.push('/create-contract-details');
  }

  return (
    <div>
        <Typography variant="h3" sx={{textAlign: "center"}}>Are you a buyer or seller?</Typography>
        <br />
        <br />
        <Grid
          container
          spacing={2}
          direction="column"
          alignItems="center"
          justifyContent="center"
        >
          <Grid item>
            <FormControl>
            <RadioGroup
              value={newContractDetails.firstPartyType}
              onChange={handleChangeFor('firstPartyType')}
            >
              <FormControlLabel value="buyer" control={<Radio />} label="Buyer" />
              <FormControlLabel value="seller" control={<Radio />} label="Seller" />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item>
            {/* when user clicks 'Next' button, the secondPartyType is set and user is pushed to CreateContractDetails */}
            <Button variant="contained" onClick={() => handleChangeForSecondParty('secondPartyType', secondParty)}>Next</Button>
          </Grid>
        </Grid>     
    </div>
  );

}

export default PartyType;