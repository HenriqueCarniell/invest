import { useEffect, useState } from 'react';
import Header from "../header/header";
import './projetos.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';

interface Dados {
    nome: string;
    price: number;
    opcao: string;
}

const Projetos:React.FC = () => {
    const [dados, setDados] = useState<Dados[]>([]);

    useEffect(() => {
        axios.get('http://localhost:4000/dados')
            .then(response => {
                console.log(response.data);
                setDados(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const navigate = useNavigate();

    const rotaprojetos = () => {
        navigate('/criarprojeto');
    }
    return (
        <div>
            <Header/>
            <div id="div-projetos-tb">
                <h1>Meus Projetos</h1>
                <button onClick={() => {rotaprojetos()}} id="button">Criar Projeto</button>
            </div>
            <div id="projetos">
                {dados.map((dado, index) => (
                    <div key={index}  id="div-projeto">
                        <div id="title-div-projetos">
                            <h1 className="dado-nome">{dado.nome}</h1>
                        </div>
                        <p className="dado-price">Orçamento: {dado.price}</p>
                        <p className="dado-opcao">{dado.opcao}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projetos;
