import { Link } from "react-router";

export default function Header() {
  
    return (

        <>
            <header  className="header">
                <div className="logo">Logo</div>
                <div className="sign-up">
                    <Link to="/sign-up">  Sign Up</Link>
                </div>
                <div className="login">

                    <Link to="/log-in">Login</Link>
                </div>
            </header>
        </>
    );
}