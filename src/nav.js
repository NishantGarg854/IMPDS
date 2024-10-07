import FeatherIcon from 'feather-icons-react';
import './nav.css';

export default function Navigation() {
    function toggleMenu(){
        var element = document.getElementById("navigation");
        element.classList.toggle("open");

        var closeMenu = document.getElementById("closeMenu");
        closeMenu.classList.toggle("hide");

        var openMenu = document.getElementById("openMenu");
        openMenu.classList.toggle("hide");
    }
    return (
        <div className='navigation' id="navigation">
            <button className="closeMenu toggleMenu hide" id="closeMenu" onClick={toggleMenu}><FeatherIcon icon="x" /></button>
            <button className="openMenu toggleMenu" id="openMenu" onClick={toggleMenu}><FeatherIcon icon="menu" /></button>
            <ul className='m-0 p-0 mainNavigation'>
                <li className='active'><a href=""><span className='icon'><FeatherIcon icon="home" /></span><span>Home</span></a></li>
                <li><a href=""><span className='icon'><FeatherIcon icon="layers" /></span><span>Dashboard</span></a></li>
                <li><a href=""><span className='icon'><FeatherIcon icon="file-text" /></span><span>Reports</span></a></li>
                <li><a href=""><span className='icon'><FeatherIcon icon="log-out" /></span><span>Logout</span></a></li>
            </ul>
        </div>
    );
}