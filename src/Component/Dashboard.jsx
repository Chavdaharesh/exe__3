import {React} from "react";
import '../App.css';

function Dashboard() {
    return (        
        <div className="dashboard-container">
            <nav className="dashboard-nav">
                <ul>
                    <li><a href="#dashboard">Dashboard</a></li>
                    <li><a href="#profile">Profile</a></li>
                    <li><a href="#settings">Settings</a></li>
                </ul>
            </nav>

        </div>
    );
}

export default Dashboard;