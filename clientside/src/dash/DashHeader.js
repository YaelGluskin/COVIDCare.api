import { Link } from "react-router-dom";
import { DASH_REGEX, CLIENTS_REGEX, USERS_REGEX, DISEASES_REGEX, VACCINES_REGEX } from "../config/dash";

const DashHeader = () => {
    const content = (

        <header className="dash-header">
            <div className="dash-header__container">
                {/* 
                    Link component is used to create a navigation link to the "/dash" path.
                    Clicking on the title navigates to the dashboard.
                */}
                <Link to="/dash">
                    <h1 className="dash-header__title">COVIDCare</h1>
                </Link>
                {/* 
                    Placeholder for navigation buttons. 
                    You can add navigation buttons here later.
                */}
                <nav className="dash-header__nav">
                    {/* add nav buttons later */}
                </nav>
            </div>
        </header>

        
    )
    return content
}
export default DashHeader