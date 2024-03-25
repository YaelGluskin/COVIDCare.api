import { Link } from "react-router-dom";

const Public = () => {
    const content = (
        <section className="public">
            <header>
                <h1>Welcome to <span className="nowrap">CORONA-Care!</span></h1>
            </header>
            <main className="public__main">
                <p>CORONA-Care is a secure platform intended for registered users who are employees of the health insurance fund.</p>
                <p>Please note that CORONA-Care contains sensitive patient data and is designed for authorized personnel only.</p>
                <address className="public__addr">
                    Health Insurance Fund<br />
                    123 Secure Data Avenue<br />
                    City, State 12345<br />
                    <a href="tel:+1234567890">(123) 456-7890</a>
                </address>
                <br />
                <p>System Administrator: Israel Israeli</p>
            </main>
            <footer>
                <Link to="/login">Employee Login</Link>
            </footer>
        </section>
    );
    
    return content;
    
    
}
export default Public;