import { faRobot } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className='not-found'>
            <h1 className='not-found__header'>
                404 Not Found
                <FontAwesomeIcon icon={faRobot} className='not-found__icon' />
            </h1>
            <Link to='/' className='not-found__link'>Home Page</Link>
        </div>
    )
}

export default PageNotFound;
