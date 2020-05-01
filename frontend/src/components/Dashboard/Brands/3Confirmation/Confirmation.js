import React from 'react'
import { Link } from 'react-router-dom'
import auth from '../../../Home/CommonComponents/Auth'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
const Confirmation = (props) => {
    return (
        <div>
            <center>
                <Card style={{ width: '48rem', backgroundColor: '#68FFDC' }}><Card.Body>
                    <Card.Title>Confirmation Page</Card.Title>
                    <Card.Title>Booking Information</Card.Title>
                    <Card.Text>
                        {props.location.bookingInfo.langSelected}
                        {props.location.bookingInfo.slotTypeSelected}
                        {props.location.bookingInfo.advtTypeSelected}

                    </Card.Text>
                    <Row>
                        <Col>
                            <Card.Img variant="top" src={'../' + props.location.projectData.imageName} style={{ padding: 10, height: '250px', width: '300px' }} />
                        </Col>
                        <Col>
                            <Row style={{ fontWeight: "bold", fontSize: '25px' }}>{props.location.projectData.channelName}</Row>
                            <Row style={{ fontWeight: "bold", fontSize: '20px' }}>Channel TRP @ {props.location.projectData.channelTRP}</Row>
                            <Row style={{ fontWeight: "bold", fontSize: '20px' }}>Manager Name : {props.location.projectData.managerName}</Row>
                            <Row style={{ fontWeight: "bold", fontSize: '20px' }}>Address: {props.location.projectData.channelAddress}</Row>

                        </Col>
                    </Row>
                    <Button variant="primary"><Link to='/brandsDashboard/paymentsGateway' style={{ color: '#fff' }} onClick={confirmBookingAtServer}>Confirm Booking and go to Payments</Link></Button>

                </Card.Body>
                </Card>
            </center>

        </div>
    )

    function confirmBookingAtServer() {

        fetch('/api/consumer/addNewBooking', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "consumerEmail": auth.userEmail,
                "adminEmail": props.location.projectData.email,
                "projectId": props.location.projectData._id,
                "langSelected": props.location.bookingInfo.langSelected,
                "slotTypeSelected": props.location.bookingInfo.slotTypeSelected,
                "advtTypeSelected": props.location.bookingInfo.advtTypeSelected,
                "finalPrice": props.location.bookingInfo.finalPrice

            }),
        })
            .then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log('error when calling confirmAppointmentAtServer ', error))

    }
}

export default Confirmation
