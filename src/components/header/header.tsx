import './header.css';
import foto from './img/foto.jpg';

const Header: React.FC = () => {
    return (
        <div id="Container">
            <div id="img">
                <img src={foto} alt="" />
            </div>

            <div id="list">
                <ul>
                    <a href="/"><li>Home</li></a>
                    <a href="/projetos"><li>Projetos</li></a>
                    <a href=""><li>Empresa</li></a>
                    <a href=""><li>Contato</li></a>
                </ul>
            </div>
        </div>
    );
}

export default Header;