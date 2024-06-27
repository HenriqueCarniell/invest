import { useEffect, useState } from 'react';
import Header from "../header/header";
import './projetos.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import MyModal from './modal/modal';

interface Dados {
    id: number;
    nome: string;
    price: number;
    opcao: string;
}

const Projetos: React.FC = () => {
    const [dados, setDados] = useState<Dados[]>([]);
    const [modalShow, setModalShow] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Dados | null>(null);

    useEffect(() => {
        axios.get<Dados[]>('https://api-invest-m6y8.onrender.com/dados')
            .then(response => {
                console.log(response.data);
                setDados(response.data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const Delete = (id: number) => {
        axios.delete(`https://api-invest-m6y8.onrender.com/delete/${id}`)
            .then(response => {
                setDados(dados.filter(dado => dado.id !== id));
            })
            .catch(error => {
                console.error(error);
            });
    };

    const navigate = useNavigate();

    const rotaprojetos = () => {
        navigate('/criarprojeto');
    };

    const handleShowModal = (project: Dados) => {
        setSelectedProject(project);
        setModalShow(true);
    };

    const handleCloseModal = () => {
        setSelectedProject(null);
        setModalShow(false);
    };

    return (
        <div id="Container-Projetos">
            <Header />
            <div id="div-projetos-tb">
                <h1>Meus Projetos</h1>
                <button onClick={rotaprojetos} id="button">Criar Projeto</button>
            </div>
            <div id="projetos">
                {dados.map((dado) => (
                    <div key={dado.id} id="div-projeto">
                        <div id="title-div-projetos">
                            <h1 className="dado-nome">{dado.nome}</h1>
                        </div>
                        <p className="dado-price">Orçamento: {dado.price}</p>
                        <p className="dado-opcao">{dado.opcao}</p>
                        <div id="buttons-div-projetos">
                            <button onClick={() => Delete(dado.id)}>Deletar</button>
                            <Button variant="primary" onClick={() => handleShowModal(dado)}>
                                Alterar
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <MyModal
                show={modalShow}
                onHide={handleCloseModal}
                project={selectedProject}
            />
        </div>
    );
};

export default Projetos;
