import React from 'react'
import Header from '../components/header'
import { Col, Container, Row } from 'react-bootstrap'

const About = () => {
    return (
        <div>
            <Header />

            <Container>
                <Row className='pt-5'>
                    <Col>
                        <h1>
                            About Us
                        </h1>
                        <h3 className='para_txt' style={{ fontWeight: "initial" }}>
                            A psychiatrist is a medical doctor (M.D. or D.O.) who specializes in the diagnosis, treatment, and prevention of mental, emotional, and behavioral disorders. They are trained to assess both the mental and physical aspects of psychological problems and can provide a variety of treatment options, including:
                        </h3>
                    </Col>
                    <Col>
                        {/* <img src={Picture} className='hero_img' style={{ height: "500px", width: "400px" }} /> */}
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default About