import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import { useNavigate, useLocation } from "react-router-dom";

const DashFooter = () => {
    // Get navigation function and current location from React Router
    const nav = useNavigate();
    const { pathname } = useLocation();
    
    // Function to handle click on "Go Home" button
    const onGoHomeClicked = () => nav('./dash');

    let goHomeBtn = null;
    // Render "Go Home" button only if the current path is not "/dash"
    if (pathname !== '/dash') {
        goHomeBtn = (
            <button
                className="dash-footer__button icon-button"
                title="Home"
                onClick={onGoHomeClicked}
            >
                <FontAwesomeIcon icon={faHouse} />
            </button>
        );
    }

    // Define the content of the DashFooter component
    const content = (
        <footer className="dash-footer">
            {goHomeBtn}
            {/* Placeholder for displaying current user */}
            <p>Current User:</p>
            {/* Placeholder for displaying status */}
            <p>Status:</p>
        </footer>
    );

    // Return the content of the DashFooter component
    return content;
};
export default DashFooter;