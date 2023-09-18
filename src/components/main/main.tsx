import './main.css'

const Main: React.FC = () => {

    
    return (
        <div id="main">
            <div id="title">
                <h1 id="bemvindo">Bem-Vindo ao Costs</h1>
                <p id="paragrafo">Comece a gerenciar os seus projetos agora mesmo!</p>
            </div>
            <div id="divbtn">
            <a href="/criarprojeto"><button id="botao">Criar projeto</button></a>
            </div>
        </div>
    );
}

export default Main;