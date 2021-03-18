import React from 'react'
import { Link } from 'react-router-dom';
import { isAuthenticated as isStaffAuthenticated } from "../../util/staffApi";
import { isAuthenticated as isStudentAuthenticated } from "../../util/studentApi";

import Button from '@material-ui/core/Button';

import './homeStyle.css'

import redImage from './raspberries.jpg'
import ratingIcon from './ratingIcon.png'
import menuIcon from './menuIcon.png'
import absenceIcon from './absenceIcon.png'
import notificationIcon from './notificationIcon.png'
import mobSS from './mobSS.jpg'

import logoImage from './../../logos/redLogo.png'


function Home() {
document.body.style.overflow = 'auto'

    return (
        <div id="homepageWrapper" >
            <div id="home__background__wrapper">
                <img src={redImage} alt="" />
                <div className="custom-shape-divider-bottom-1615315934">
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 0L0 0 892.25 114.72 1200 0z" className="shape-fill"></path>
                    </svg>
                </div>
            </div>

            <div id="home__sectionOne">
                <div id="home__sectionOne__left">
                <div id="home__sitename">
                    <div>
                        <img src={logoImage} />
                    </div>
                    Messmate
                </div>
                    <div id="home__sitedesc">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
                    <a href="#home__sectionTwo">
                            <Button className="home__sitedesc__button">Know more</Button>
                        </a>
                    </div>
                    <div id="home__signin__wrapper">
                        <div>Login</div>
                        <div>
                        {/* <Link to="/dashboard/student"> <Button className="home__signin__button">As student</Button> </Link> */}
                        {/* <Link to="/dashboard/student"> <Button className="home__signin__button">As staff</Button> </Link> */}
                            <span>
                                {isStudentAuthenticated() && isStudentAuthenticated().studenttoken !== "" ? (
                                    <Link to="/dashboard/student"><Button className="home__signin__button" onclick={() => {window.scrollTo(0,0)}}>As student</Button></Link>
                                ) : (
                                    <Link to="/login/student"><Button className="home__signin__button">As student</Button></Link>
                                )}
                            </span>
                            <span>
                                {isStaffAuthenticated() && isStaffAuthenticated().stafftoken !== "" ? (
                                    <Link to="/dashboard/staff"><Button className="home__signin__button">As staff</Button></Link>
                                ) : (
                                    <Link to="/login/staff"><Button className="home__signin__button">As staff</Button></Link>
                                )}
                            </span>
                            {/* <Button className="home__signin__button" onclick={() => {window.scrollY(0)}}>As student</Button> */}
                        </div>
                    </div>
                </div>


                <div id="home__sectionOne__right">
                    <img src={mobSS} alt="" />
                </div>
            </div>

            <div id="home__sectionTwo">
                <div id="home__sectionTwo__heading">Why use Messmate?</div>
                <div id="home__featureGrid">
                    <div className="home__featureGrid__card">
                        <img src={absenceIcon} alt="" />
                        <div className="home__featureGrid__card__heading">
                            Prior information about absentees
                    </div>
                        <div className="home__featureGrid__card__desc">
                            Some description
                    </div>
                    </div>
                    <div className="home__featureGrid__card">
                        <img src={ratingIcon} alt="" />
                        <div className="home__featureGrid__card__heading">
                            Meal rating and reviews
                    </div>
                        <div className="home__featureGrid__card__desc">
                            Some description
                    </div>
                    </div>
                    <div className="home__featureGrid__card">
                        <img src={notificationIcon} alt="" />
                        <div className="home__featureGrid__card__heading">
                            Announcements via push notifications
                    </div>
                        <div className="home__featureGrid__card__desc">
                            Some description
                    </div>
                    </div>
                    <div className="home__featureGrid__card">
                        <img src={menuIcon} alt="" />
                        <div className="home__featureGrid__card__heading">
                            Check daily menu
                    </div>
                        <div className="home__featureGrid__card__desc">
                            Some description
                    </div>
                    </div>
                </div>
            </div>

            <div id="home__footer">
                <div>Developed by <strong>Team Coding Poltergeists</strong></div>
                <div><a href="https://developers.google.com/community/dsc-solution-challenge" target="blank">DSC Solution Challange '21</a></div>
                <div><a href="https://github.com/koderharsh/MessMate" target="blank">View on Github</a></div>
            </div>
        </div>
    )
}

export default Home
