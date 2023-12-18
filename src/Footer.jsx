import React from "react";
// import PrivacyModal from "../ModalView/PrivacyModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PersonIcon from '@mui/icons-material/Person';
import {
    faLinkedin,
    faGithub,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";
import { faCopyright } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="item1">
                    
                </div>

                <div className="item2">
                    <span style={{ paddingRight: 5 }}>Copyright </span>
                    <FontAwesomeIcon icon={faCopyright} />{" "}
                    <span style={{ paddingLeft: 5 }}>
                        {new Date().getFullYear()} MAHAMMED RAZEEN. All Rights
                        Reserved.
                    </span>
                </div>
                <a
                    href="https://github.com/Razeenofficial/"
                    target="_blank"
                    className="item3"  
                >
                    <FontAwesomeIcon icon={faGithub} />
                </a>
                <a
                    href="https://www.linkedin.com/in/mahammed-razeen-49177b226/"
                    target="_blank"
                    className="item4"
                >
                    <FontAwesomeIcon icon={faLinkedin} />
                </a>
                <a
                    href="https://mahammedrazeen.netlify.app/"
                    target="_blank"
                    className="item5"
                >
                <PersonIcon color="white" />                </a>

            </div>
        </footer>
    );
};

export default Footer;