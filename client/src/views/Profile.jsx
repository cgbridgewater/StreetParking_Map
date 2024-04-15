import { Link, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react";
import axios from 'axios';
import BadLink from "./BadLink";
import patoIcon from "../assets/pato_icon.png"
import galloIcon from "../assets/gallo_icon.png"
import palomaIcon from "../assets/paloma_icon.png"
import KeyBanner from "../assets/key_banner.png"
import Spinner from "../components/Spinner";

function Profile(props) {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [showSpinner, setShowSpinner] = useState(true); // State for showing spinner
    const [ userToken ] = useState("");
    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ JVM, setJVM ] = useState("");
    const [ addressLine1, setAddressLine1 ] = useState("");
    const [ addressLine2, setAddressLine2 ] = useState("");
    const [ spotify, setSpotify ] = useState("");
    const [ instagram, setInstagram ] = useState("");
    const [ facebook, setFacebook ] = useState("");
    // const [ getErrors, setGetErrors] = useState("null");

    const JVMTeam = () => {
        if( JVM == "Pato" ) {
            return <img className="JVMicon" src={patoIcon} alt="Pato" />;
        } else if ( JVM == "Gallo" ){
            return <img className="JVMicon" src={galloIcon} alt="Gallo" />;
        } else if ( JVM == "Paloma" ){
            return <img className="JVMicon" src={palomaIcon} alt="Paloma" />;
        } else 
            return <img className="JVMicon" src={KeyBanner} alt="No Team" />;
    };

    useEffect(() => {
        // scroll to top
        window.scrollTo(0,0)
        // Get User Data
        const fetchData = () => {
        axios.get("http://localhost:8000/api/user/profile", {
            withCredentials: true,
            headers: {
                Authorization: `Bearer ${userToken}`,  // Include the User Token
            },
        })
            .then((res) => {
            setUserName(res.data.userName);
            setEmail(res.data.email);
            setJVM(res.data.JVM);
            setAddressLine1(res.data.addressLine1);
            setAddressLine2(res.data.addressLine2);
            setSpotify(res.data.spotify);
            setInstagram(res.data.instagram);
            setFacebook(res.data.facebook);
            setTimeout(() => {
                setShowSpinner(false); // Turn off the spinner after 2 seconds
                setIsLoading(false); // Switch Ternary If Load is successful
            }, 500);
            })
            .catch((err) => {
                props.setAuthorized("Please log in to access profile pages!");
                console.log("NO REP!");
            navigate("/login")
            });
        }
        fetchData(); // Call the fetchData function
        return () => {
            clearTimeout(fetchData); // Reset the fetchData timer
        };
    }, [userToken]);

    return (
        <div>
            {/* SPINNER TERNARY */}
            {showSpinner ? (
                <Spinner />
            ) : 
            // IS LOADING TERNARY
            (isLoading ? (
                <BadLink /> // Show 404 if page fails to load
            ) :
                // ON SUCCESSFUL LOAD // MAIN CONTAINER //
                <div className="MainContainer">
                    {/* PROFILE TITLE AND LOGO */}
                    <div className="ProfileFlex">
                        <h1 className='ProfileHeader'><span className="Gold" style={{textTransform: 'capitalize'}}>{ userName }'s</span><br /> Profile Page</h1>
                        { JVMTeam() }
                    </div>
                    {/* PROFILE CONTAINER */}
                    <div className="ProfileContainer">
                        {/* LOCATION INFO SECTION */}
                        <div className="ProfileLocation">
                            {/* LOCATION TITLE AND UPDATE BUTTON */}
                            <div className="ProfileFlex2">
                                <h3 className="LocationTitle">Pin Location:</h3>
                                <Link to="/profile/updateaddress" className="ProfileUpdate">Update Location</Link>
                            </div>
                            {/* ADDRESS DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fas fa-map-marked-alt fa-sm" style={{color: "#C89211"}}></i>&nbsp; Address:</h4> 
                            <h4 className="ProfileText">{addressLine1}</h4>
                            <h4 className="ProfileText">{addressLine2}</h4>
                        </div>
                        <hr className="SeperationLineFull" />
                        {/* SOCIALS INFO SECTION */}
                        <div className="ProfileSocials">
                            {/* SOCIAL TITLE AND UPDATE BUTTON */}
                            <div className="ProfileFlex2">
                                <h3 className="SocialsTitle"> Social Media:</h3>
                                <Link to="/profile/updatesocials" className="ProfileUpdate">Update Socials</Link>
                            </div>
                            {/* EMAIL DISPALY */}
                            <h4 className="ProfileTitle">< i className="fas fa-envelope fa-sm" style={{color: "#C89211"}}></i>&nbsp; Email:</h4>
                            <h4 className="ProfileText">{email} </h4>
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* JVM DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fas fa-user-friends fa-sm" style={{color: "#C89211"}}></i>&nbsp; JVM Team:</h4>
                            { !JVM ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText">{JVM}</h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* INSTAGRAM DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-instagram-square fa-sm" style={{color: "#C89211"}}></i>&nbsp; Instagram:</h4>
                            { !instagram ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText"><a className="ProfileText" href={`https://www.instagram.com/${instagram}`} target="_blank" rel="noopener noreferrer">{instagram}</a></h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* FACEBOOK DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-facebook-square fa-sm" style={{color: "#C89211"}}></i>&nbsp; Facebook:</h4>
                            { !facebook ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText"><a className="ProfileText" href={`https://www.facebook.com/${facebook}`} target="_blank" rel="noopener noreferrer">{facebook}</a></h4>
                            }
                            {/* GOLD LINE */}
                            <hr className="SeperationLine" />
                            {/* SPOTIFY DISPLAY */}
                            <h4 className="ProfileTitle">< i className="fab fa-spotify fa-sm" style={{color: "#C89211"}}></i>&nbsp; Spotify:</h4>
                            { !spotify ?
                                <h4 className="ProfileText">Not Provided</h4>
                            :
                                <h4 className="ProfileText"><a className="ProfileText" href={`http://open.spotify.com/user/${spotify}`} target="_blank" rel="noopener noreferrer">{spotify}</a></h4>
                            }
                        </div>
                        {/* END SOCIALS INFO SECTION */}
                    </div>
                        {/* LINKS */}
                        <div className="ProfileLinks">
                            <Link className="ProfileToMap"  to="/">View Map</Link>
                            <Link className='Logout' to="/profile/logout">Logout</Link>
                            <Link className='ProfileDelete' to="/profile/delete">Delete Profile</Link>
                        </div>
                        {/* END LINKS */}
                </div>
                // END PROFILE CONTAINER //
            )}
            {/* END IS LOADING TERNARY */}
        </div>
        // END SPINNER TERNARY
    )
}

export default Profile