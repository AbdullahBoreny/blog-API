import { Link } from "react-router";
import '../styles/sidebar.css';
export default function Sidebar() {

    return (

        <aside className="sidebar">
            <section className="sidebar-section">
                <Link className="sidebar-title-link" to='/'>
                    <span><img width={16} height={16} src="/favIcon.png" alt="" /></span>
                    <span className="site-name">Boreny</span>
                </Link>
            </section>
            <section className="sidebar-section">
                <h2>About me</h2>
                <div className="sidebar-content">
                    <p>
                        i'm
                        <a href="#"> abdullah</a>
                        , software engineer and open-source creator. This is my digital garden. 🌱
                    </p>
                </div>
            </section>
            <section className="sidebar-section">
                <nav className="sidebar-nav-links">
                    <a href="#">
                        <img src="/blog.png" alt="Blog" />
                        Blog

                    </a>
                    <a href="#">
                        <img src="/notes.png" alt="Blog" />
                        Notes</a>
                    <a href="#">
                        <img src="/projects.png" alt="Blog" />
                        Projects</a>
                    <a href="#">
                        <img src="/favIcon.png" alt="Blog" />
                        About Me</a>
                </nav>
            </section>
            <section className="sidebar-section">
                <h2>stay connected</h2>
                <p className="sidebar-links">
                    <a href="">Email</a>
                    <a href="">FaceBook</a>
                    <a href="">instagram</a>
                    <a href="">linkedin</a>
                </p>
            </section>
        </aside>
    );
}