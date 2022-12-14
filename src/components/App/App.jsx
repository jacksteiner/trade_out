import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';

import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';

import AboutPage from '../AboutPage/AboutPage';
import UserPage from '../UserPage/UserPage';
import InfoPage from '../InfoPage/InfoPage';
import LandingPage from '../LandingPage/LandingPage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import RecipientView from '../RecipientView/RecipientView';
import Dashboard from '../Dashboard/Dashboard.jsx';
import ContractDetails from '../ContractDetails/ContractDetails.jsx';
import Notifications from '../Notifications/Notifications.jsx';
import CounterOfferEdits from '../CounterOffer/CounterOfferEdits.jsx';
import CounterOfferReview from '../CounterOffer/CounterOfferReview.jsx';

import CreateContractDetails from '../CreateContract/CreateContractDetails.jsx';
import CreateContractReview from '../CreateContract/CreateContractReview.jsx';
import PartyType from '../CreateContract/PartyType.jsx';
import SendToRecipient from '../CreateContract/SendToRecipient.jsx';

import ContractComparison from '../ContractComparison/ContractComparison.jsx';
import FinalContract from '../ContractAccepted/FinalContract.jsx';
import ReviewAndSign from '../ContractAccepted/ReviewAndSign.jsx';
import './App.css';

// imports for MUI date picker
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

// imports for MUI color theme
import { createTheme, ThemeProvider } from '@mui/material/styles';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  const colorTheme = createTheme({
    palette: {
      green: {
        main: '#4BC975',
      },
      purple: {
        main: '#6622CC',
      },
      grey: {
        main: '#5A5A5A',
      }
    }
  });

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <ThemeProvider theme={colorTheme}>
        <Router>
          <div className="Main-content">
            <Nav />
            <Switch>
              {/* Visiting localhost:3000 will redirect to localhost:3000/dashboard */}
              <Redirect exact from="/" to="/dashboard" />

              {/* Visiting localhost:3000/about will show the about page. */}
              <Route
                // shows AboutPage at all times (logged in or not)
                exact
                path="/about"
              >
                <AboutPage />
              </Route>

              {/* For protected routes, the view could show one of several things on the same route.
                Visiting localhost:3000/user will show the UserPage if the user is logged in.
                If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
                Even though it seems like they are different pages, the user is always on localhost:3000/user */}
              <ProtectedRoute
                // logged in shows UserPage else shows LoginPage
                exact
                path="/user"
              >
                <UserPage />
              </ProtectedRoute>

              <ProtectedRoute
                // logged in shows InfoPage else shows LoginPage
                exact
                path="/info"
              >
                <InfoPage />
              </ProtectedRoute>

          


            {/* NEW COMPONENT PROTECTED ROUTES */}
            <ProtectedRoute 
              exact path = "/dashboard"
            >
              <Dashboard />
            </ProtectedRoute>
            
            <ProtectedRoute 
              exact path="/contract-details/:contractId"
            >
              <ContractDetails />
            </ProtectedRoute>

            <ProtectedRoute 
            exact path="/notifications"
            >
              <Notifications />
            </ProtectedRoute>

            <ProtectedRoute 
              exact path="/counter-offer-edits"
            >
              <CounterOfferEdits />
            </ProtectedRoute>

            <ProtectedRoute 
              exact path="/counter-offer-review"
            >
              <CounterOfferReview />
            </ProtectedRoute>
      
            <ProtectedRoute
              exact path="/create-contract-details"
            >
              <CreateContractDetails />
            </ProtectedRoute> 
            
            <ProtectedRoute
              exact path="/create-contract-review"
            >
              <CreateContractReview />
            </ProtectedRoute> 

            <ProtectedRoute
              exact path="/party-type"
            >
              <PartyType />
            </ProtectedRoute> 

            <ProtectedRoute
              exact path="/send-to-recipient"
            >
              <SendToRecipient />
            </ProtectedRoute> 

            <ProtectedRoute
              exact
              path="/contract-comparison"
            >
              <ContractComparison />
            </ProtectedRoute>

            <ProtectedRoute
              path="/final-contract"
              >
                <FinalContract />
            </ProtectedRoute>

            <ProtectedRoute
                path="/review-and-sign"
              >
                <ReviewAndSign />
            </ProtectedRoute>
            
            {/* ----------------------- */}
            
              <Route
                exact
                path="/login"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect to the /user page
                  <Redirect to="/dashboard" />
                  :
                  // Otherwise, show the login page
                  <LoginPage />
                }
              </Route>

              <Route
                exact
                path="/registration"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/dashboard" />
                  :
                  // Otherwise, show the registration page
                  <RegisterPage />
                }
              </Route>

              <Route
                exact
                path="/home"
              >
                {user.id ?
                  // If the user is already logged in, 
                  // redirect them to the /user page
                  <Redirect to="/user" />
                  :
                  // Otherwise, show the Landing page
                  <LandingPage />
                }
              </Route>

              {/* NEW COMPONENT UNPROTECTED ROUTES */}
              <Route
                exact path="/recipient-view/:searchContractKey"
              >
                <RecipientView />
              </Route>
            {/* ----------------------- */}

              {/* If none of the other routes matched, we will show a 404. */}
              <Route>
                <h1>404</h1>
              </Route>
            </Switch>
            </div>
          <Footer />
        </Router>
      </ThemeProvider>
    </LocalizationProvider>
  );
}

export default App;
