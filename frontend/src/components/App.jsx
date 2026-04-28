import Posts from "./Posts";
import '../styles/App.css'
import Sidebar from "./Sidebar";
export default function App() {
    return (
        <div className="app-container">
            {/* <Header /> */}
            <Sidebar />
            <Posts />


        </div>
    );
}