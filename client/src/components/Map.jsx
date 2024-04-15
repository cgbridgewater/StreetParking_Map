import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import patoIcon from "../assets/pato_icon.png"
import galloIcon from "../assets/gallo_icon.png"
import palomaIcon from "../assets/paloma_icon.png"
import KeyBanner from "../assets/key_banner.png"
import KeyLogo from "../assets/Key_Logo_Round.png"

mapboxgl.accessToken = import.meta.env.VITE_MB_Mapbox_Token;

function Map() {
    const mapContainer = useRef(null);
    const map = useRef(null);
    const flyToDuration = 2500;
    const [user, setUser] = useState([]);
    const [lng] = useState((Math.random() - 0.5) * 360);
    const [lat] = useState((Math.random() - 0.5) * 100);
    const [zoom] = useState(1);

    // CREATE INITIAL MAP AND SP MARKER
    useEffect(() => {
        // GET USERS TO CREATE PINS
        window.scrollTo(0, 0);
        axios.get("http://localhost:8000/api/allusers")
            .then((res) => {
                setUser(res.data);
            })
            .catch((err) => {
                console.log("Something went wrong when gathering pins!");
            });
        // Create a new map
        if (map.current) return;
        map.current = new mapboxgl.Map({
            attributionControl: false,
            animation:true,
            essential:true,
            container: mapContainer.current,
            style: 'mapbox://styles/mapbox/outdoors-v12?optimize=true',
            center: [lng, lat],
            zoom: zoom,
        });
        // Create Custom Footer In Map For SP Link
        map.current.addControl(
            new mapboxgl.AttributionControl({
                customAttribution: '<a href="https://streetparking.com/" target="_blank">Street Parking</a>',
                compact: false,
            })
        );
        // Add Map Controls
        map.current.addControl(
            new mapboxgl.NavigationControl({
                showCompass: true, showZoom: true 
            })
        );
        // Create A Fly To Animation To SPHQ From A Randomized Start Point On Map Load And Open SPHQ Pop Up
        map.current.on('load', () => {
            map.current.easeTo({
                center: [-122.483261, 45.267216], //Center For Popup to SPHQ
                zoom: 7.5,
                duration: flyToDuration,
                curve: 1.42,
                easing(t) {
                    return t;
                },
            });
            setTimeout(() => {
                SPHQMarker.click();
            }, flyToDuration+250);
            // atmosphere styling //
            map.current.setFog({
                color: 'rgb(133, 179, 229)', // Lower atmosphere
                'high-color': 'rgb(36, 92, 223)', // Upper atmosphere
                'horizon-blend': 0.04, // Atmosphere thickness (default 0.2 at low zooms)
                'space-color': 'rgb(11, 11, 25)', // Background color
                'star-intensity': 0.7 // Background star brightness (default 0.35 at low zoooms )
            })
        });
        // SPHQ Pop Up HTML
        const SPHQMarkerInfo =
        `
        <div>
            <h1>Street Parking HQ</h1>
            <div>
                <img src="${KeyLogo}" alt="Team Icon" />
            </div>
            <div>
                <p><i class="fab fa-instagram-square"></i>&nbsp;</p>
                <a href="https://www.instagram.com/streetparking/" target="_blank" rel="noopener noreferrer">StreetParking</a>
            </div>
            <div>
                <p><i class="fab fa-facebook-square"></i>&nbsp;</p>
                <a href="https://www.facebook.com/streetparkingfitness" target="_blank" rel="noopener noreferrer">StreetParkingFitness</a>
            </div>
            <div>
                <p><i class="fab fa-youtube"></i>&nbsp;</p>
                <a href="https://www.youtube.com/streetparking" target="_blank" rel="noopener noreferrer">StreetParking</a>
            </div>
            <div>
                <p><i class="fab fa-spotify"></i>&nbsp;</p>
                <a href="http://open.spotify.com/user/5xm55d6kzn5pwtd3y7qmfjegw?si=7700329fc8e24bf5" target="_blank" rel="noopener noreferrer">Street Parking</a>
            </div>
            <div>
                <p><i class="fas fa-podcast"></i>&nbsp;</p>
                <a href="https://open.spotify.com/show/1pFbX5YlC9zovLjp5XyImk?si=D0EmQRNSQAKLbdyDo4hnPg" target="_blank" rel="noopener noreferrer">Street Parking Podcast</a>
            </div>
        </div>
        `
        // CREATE SPHQ MARKER 
        const SPHQMarker = document.createElement('div');
        SPHQMarker.className = "Marker HQ";
        new mapboxgl.Marker(SPHQMarker)
            .setLngLat([-122.483261, 45.614846])
            .setPopup(new mapboxgl.Popup().setHTML(SPHQMarkerInfo))
            .addTo(map.current);
        }, []);

    // // CREATE USER MARKERS // //
    useEffect(() => {
        // Loop through users
        if (!map.current || user.length === 0) return;
        for (const oneUser of user) {
            // create user marker element
            const el = document.createElement('div');
            // select user marker icon based on JVM team
            if (oneUser.JVM === 'Pato') {
                el.className = 'Marker Pato';
            } else if (oneUser.JVM === 'Gallo') {
                el.className = 'Marker Gallo';
            } else if (oneUser.JVM === 'Paloma') {
                el.className = 'Marker Paloma';
            } else if (oneUser.JVM === '') {
                el.className = 'Marker';
            }
            // JVM Icon Selector
            const JVMTeam = () => {
                if( oneUser.JVM == "Pato" ) {
                    return `<div><img src="${patoIcon}" alt="Team Icon" /></div>`
                } else if ( oneUser.JVM == "Gallo" ){
                    return `<div><img src="${galloIcon}" alt="Team Icon" /></div>`
                } else if ( oneUser.JVM == "Paloma" ){
                    return `<div><img src="${palomaIcon}" alt="Team Icon" /></div>`
                } else 
                    return `<div><img src="${KeyBanner}" alt="Team Icon" /></div>`
            };
            // Display Facebook if provided
            const facebookInfo = () => {
                if( !oneUser.facebook) {
                    return "<div></div>"
                } else 
                    return `
                    <div>
                        <p><i class="fab fa-facebook-square"></i>&nbsp;</p>
                        <a href="https://www.facebook.com/${oneUser.facebook}" target="_blank" rel="noopener noreferrer">${oneUser.facebook}</a>
                    </div>
                    `
            };
            // Display Instagram if provided
            const instagramInfo = () => {
                if (!oneUser.instagram) {
                    return "<div></div>";
                } else {
                    let instagramUsername = oneUser.instagram;
                    if (instagramUsername.startsWith("@")) {
                        instagramUsername = instagramUsername.substring(1);
                    }
                    return `
                    <div>
                        <p><i class="fab fa-instagram-square"></i>&nbsp;</p>
                        <a href="https://www.instagram.com/${instagramUsername}" target="_blank" rel="noopener noreferrer">${instagramUsername}</a>
                    </div>
                    `;
                }
            };
            // Display Spotify if provided
            const spotifyInfo = () => {
                if( !oneUser.spotify) {
                    return "<div></div>"
                } else 
                    return `
                    <div>
                        <p><i class="fab fa-spotify"></i>&nbsp;</p>
                        <a href="http://open.spotify.com/user/${oneUser.spotify}" target="_blank" rel="noopener noreferrer">${oneUser.spotify}</a>
                    </div>
                    `
            };
            // package up user marker popup info
            const userMarkerInfo = 
            `<div>
                <h1>${oneUser.userName}</h1>
                ${JVMTeam()}
                ${instagramInfo()}
                ${facebookInfo()}
                ${spotifyInfo()}
            </div>`
            
            // Add packaged up user marker, popup and associated it to its location THEN add it to the map
            new mapboxgl.Marker(el)
                .setLngLat(oneUser.coordinates)
                .setPopup(new mapboxgl.Popup().setHTML(userMarkerInfo))
                .addTo(map.current)
        }
    }, [user]);

    return (
        <div className="MapBox">
            <div id="map" ref={mapContainer} className="MapContainer" />
        </div>
    );
}

export default Map;