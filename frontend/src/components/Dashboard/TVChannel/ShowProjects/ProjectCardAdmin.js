import React from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'

const ProjectCardAdmin = (props) => {

    return (
        <div>
            <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={'../' + props.projectData.imageName} style={{ padding: 10 }} />
                <Card.Body>
                    <Card.Title>{props.projectData.channelName}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Pricing Starts @ ₹ {props.projectData.bannerAdvtPrice}</Card.Subtitle>
                    <br /><br />
                    <Link to={{
                        pathname: '/tvChannelDashboard/showProjects/modal/modifyProject',
                        projectData: props.projectData
                    }}><Button variant="primary">Modify Details</Button></Link>
                </Card.Body>
                <Card.Footer>
                    <small className="text-muted">Channel TRP : {props.projectData.channelTRP}</small>
                </Card.Footer>
            </Card>
        </div>
    )
}

export default ProjectCardAdmin
