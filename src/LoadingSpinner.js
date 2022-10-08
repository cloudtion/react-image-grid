
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function LoadingSpinner(props){

    return (
        <span className="loading-spinner" {...props}>
            <FontAwesomeIcon icon={faSpinner}/>
        </span>
    );
}