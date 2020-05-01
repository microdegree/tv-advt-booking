import React, { useEffect, useState } from 'react'
import auth from '../../Home/CommonComponents/Auth'
import BrandsDashUI from './1DashboardHome/BrandsDashUI';
import BrandsDashHeader from './0CommonComponents/BrandsDashHeader'
import DetailsComponent from './2MoreDetails/DetailsComponent';
import { Route } from "react-router-dom";
import Confirmation from './3Confirmation/Confirmation';
import MyAppointments from './MyAppointments';
import PaymentGateway from './4PaymentGateway/PaymentGateway';

const BrandsDash = (props) => {

    const [userInDash, setUserInDash] = useState(0);
    const [userId, setUserId] = useState(0);

    useEffect(() => {
        fetchUser()
    }, [userId])


    return (
        <div>
            <BrandsDashHeader logout={props.history} />
            Hello {userInDash.name}
            <br /><br /><br /><br />
            <Route exact path="/brandsDashboard" component={BrandsDashUI} />
            <Route exact path="/brandsDashboard/myAppointments" component={MyAppointments} />

            <Route exact path="/brandsDashboard/moreDetails" component={DetailsComponent} />
            <Route exact path="/brandsDashboard/confirmationPage" component={Confirmation} />
            <Route exact path="/brandsDashboard/paymentsGateway" component={PaymentGateway} />

        </div>
    )

    async function fetchUser() {
        console.log('userInDash Before ' + userInDash)
        let requestObject = { "email": auth.userEmail }
        fetch('/api/authenticate/getUserInfo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(requestObject),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Dash ' + JSON.stringify(data))
                console.log('Dash ' + data[0].name)
                setUserInDash(data[0])
                setUserId(data[0].name)
            })
            .catch(err => console.log('Error when calling api : ' + err))
        console.log('userInDash After ' + userInDash)
    }
}

export default BrandsDash
