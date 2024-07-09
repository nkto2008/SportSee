import '../assets/components/horizontalNavbar.scss';
import { ReactComponent as Logo } from '../assets/logos/sportsee.svg';


function HorizontalNavbar() {
    return (
        <nav id="horizontal-navbar">
            <ul>
                <li><a href="#home"><Logo className="logo" /></a></li>
                <li><a href="#home">Accueil</a></li>
                <li><a href="#profile">Profil</a></li>
                <li><a href="#settings">Réglage</a></li>
                <li><a href="#community">Communauté</a></li>
            </ul>
        </nav>
    );
}
export default HorizontalNavbar