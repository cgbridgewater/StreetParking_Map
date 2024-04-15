import { Link } from "react-router-dom";
function MapTitle() {

  return (
    <>
      <h1 className='Title'>Is a <span>Street Parking</span> Member near you?</h1>
        <h3 className='SubTitle'>Click Around and Find Out!!</h3>
        <h5 className='Signup'>Not on the map? Setup or view profile 
          <Link to={"/profile"} className='LoginLink'>HERE</Link>
        </h5>
    </>
  )
}

export default MapTitle