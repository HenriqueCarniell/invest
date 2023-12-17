import Header from "../header/header";
import './addproject.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProject: React.FC = () => {
    const [saveName, setSaveName] = useState<string>('')
    const [saveNumber, setSaveNumber] = useState<number>(0)
    const [saveOption, setSelectOption] = useState<string>('')

    const [serverResponse, setServerResponse] = useState(null);

    const handleNameSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaveName(event.target.value);
    }

    const handleNumberSave = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSaveNumber(event.target.valueAsNumber)
    }
    const HandleSelectSave = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectOption(event.target.value)
    }
    const navigate = useNavigate()

    function Nav() {
        navigate("/projetos")
    }

    const handleSaveDados = async () => {
        const newDados = {
            name: saveName,
            Price: saveNumber,
            option: saveOption
        };
    
        try {
            const response = await axios.post("http://localhost:4000/add", {
                Nome: newDados.name,
                Price: newDados.Price,
                Option: newDados.option,
            });
    
            console.log(response.data);
            setServerResponse(response.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <Header />
            <div id="content">
                <div id="divcriarprojetos">
                    <h1>Criar Projetos</h1>
                    <p>Crie seu projeto para depois adicionar os <br />serviços</p>
                </div>
                <div id="form">
                    <h2>Nome do projeto</h2>
                    <input id="nomedoprojeto" type="text" onChange={handleNameSave} />
                    <h2>Orçamento do projeto</h2>
                    <input type="number" onChange={handleNumberSave} />
                    <h2>Selecione a categoria</h2>
                    <select name="" id="" onChange={HandleSelectSave}>
                        <option value=""></option>
                        <option value="Infra">Infra</option>
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Design">Design</option>
                        <option value="Planejamento">Planejamento</option>
                    </select>
                    <button id="btn" onClick={() => {handleSaveDados();Nav()}}>Criar Projeto</button>

                    {/* Adicionando um bloco para exibir a resposta do servidor */}
                    {serverResponse && (
                        <div>
                            <h2>Resposta do Servidor:</h2>
                            <p>{JSON.stringify(serverResponse)}</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AddProject;
