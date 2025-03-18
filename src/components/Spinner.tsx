import { faSpinner } from "@fortawesome/free-solid-svg-icons/faSpinner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Spinner = () => {
    return (
        <span >
            <FontAwesomeIcon className="loading-spinner" title="Loading" icon={faSpinner} />
        </span>
    )
}

export default Spinner;