import React from 'react'
import { Container } from 'react-bootstrap'

import medication from "../assets/medication.jpeg"
import yoga from "../assets/yoga.jpeg"
import book from "../assets/book.jpeg"
import mental from "../assets/mental.jpeg"
import images from "../assets/images.jpeg"

import Header from '../components/header'
import ChatBot from './chatBot'
import { db } from '../firebase';


const Home = () => {
    return (
        <Container style={{ overflow: "hidden" }}>
            <Header />
            <div>
                <div style={{ height: "100vh" }} className='row justify-center align-items-center'>
                    <div className='col-md-4 d-flex flex-column align-items-center'>
                        <h1>
                            Introduction
                        </h1>
                        <h3 className='para_txt' style={{ fontWeight: "initial" }}>
                            "Embrace Your Well-being Journey
                            Discover Resources for Mental Health and Healing
                            Together, Let's Prioritize Your Mental Wellness"
                        </h3>


                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-8 d-flex justify-center align-items-center'>
                        <img className='hero_img' style={{ height: "500px", width: "400px" }} src={mental} />
                    </div>
                </div>
                <div style={{ borderBottom: "1px solid grey" }} />
                <div style={{ marginTop: "30px" }} className='row justify-center align-items-center'>
                    <div className='col-md-4 '>
                        <h1>
                            Personal Story
                        </h1>
                        <h3>
                            Title: "From Darkness to Light: How I Overcame Anxiety"
                        </h3>
                        <h5 className='para_txt' style={{ color: "#829AB1", fontWeight: "initial" }}>
                            "Meet Sarah, a brave soul who battled anxiety for years. In her own words, she shares her journey of self-discovery, seeking therapy, and finding the strength to manage her anxiety.
                            Read Sarah's story of resilience and hope."
                        </h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-8 d-flex justify-center align-items-center'>
                        <img style={{ height: "300px", width: "300px" }} src={images} />
                    </div>
                </div>
                <div style={{ marginTop: "30px" }} className='row justify-center align-items-center '>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-8 d-flex justify-center align-items-center'>
                        <img style={{ height: "300px", width: "300px" }} src={medication} />
                    </div>
                    <div className='col-md-4'>
                        <h1>
                            Guided Relaxation: Finding Calm Within
                        </h1>
                        <h5 className='para_txt' style={{ color: "#829AB1", fontWeight: "initial" }}> "Immerse yourself in this soothing guided meditation led by mindfulness expert Anna. Close your eyes, breathe deeply, and let go of tension as you visualize a tranquil oasis."</h5>
                    </div>
                </div>
                <div style={{ marginTop: "30px" }} className='row justify-center align-items-center '>
                    <div className='col-md-4'>
                        <h1>
                            "Stress-Busting Yoga Flow"
                        </h1>
                        <h5 className='para_txt' style={{ color: "#829AB1", fontWeight: "initial" }}>"Unwind and release tension with this calming yoga sequence designed to alleviate stress. Follow along with our experienced yoga instructor, and feel the stress melt away."</h5>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-8 d-flex justify-center align-items-center'>
                        <img style={{ height: "300px", width: "300px" }} src={yoga} />
                    </div>
                </div>

                <div style={{ marginTop: "30px" }} className='row justify-center align-items-center'>
                    <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }} className='col-md-8 d-flex justify-center align-items-center'>
                        <img style={{ height: "300px", width: "300px" }} src={book} />
                    </div>
                    <div className='col-md-4'>
                        <h1>
                            Recommended Reads: Books for Mental Health Exploration
                        </h1>
                        <h5 className='para_txt' style={{ color: "#829AB1", fontWeight: "initial" }}> "Expand your understanding of mental health with our handpicked list of insightful books. From memoirs to self-help guides, these reads offer valuable perspectives."</h5>
                    </div>
                </div>
            </div>
            <ChatBot />
        </Container>
    )
}

export default Home