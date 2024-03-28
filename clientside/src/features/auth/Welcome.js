import { Link } from "react-router-dom";
const Welcom =() => {
    const date = new Date()
    const today = new Intl.DateTimeFormat('en-IL', {dateStyle: 'medium', timeStyle: 'long'}).format(date)
    const content = (
        <section className="welcome">
            <p>{today}</p>
            <h1>Welcome!</h1>
            <p><Link to="/dash/users">View User Settings</Link></p>
            <p><Link to="/dash/users/new">  Create new User</Link></p>

            <p><Link to="/dash/clients">View Current Clients</Link></p>
            <p><Link to="/dash/clients/new">    Create new Client</Link></p>

            <p><Link to="/dash/vaccines">View Vaccines</Link></p>
            {/* <p><Link to="/dash/vaccines/new">   Create new Vaccine</Link></p> */}

            <p><Link to="/dash/diseases">View Disease</Link></p>
            {/* <p><Link to="/dash/diseases/new">   Create new Disease</Link></p> */}
            
        </section>
    )
    return content;
}
export default Welcom;