import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

interface MyModalProps {
    show: boolean;
    onHide: () => void;
    project?: MyDataType | null;
}

interface MyDataType {
    id: number;
    nome: string;
    price: number;
    opcao: string;
}

function MyModal(props: MyModalProps) {
    const { show, onHide, project } = props;

    const [ModalNome, SetModalNome] = useState<string>(project?.nome || '');
    const [ModalNumero, SetModalNumero] = useState<number>(project?.price || 0);
    const [ModalSelectType, SetModalSelectType] = useState<string>(project?.opcao || '');

    const handleOnSaveModalNome = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetModalNome(event.target.value);
    };

    const handleOnSaveModalNumero = (event: React.ChangeEvent<HTMLInputElement>): void => {
        SetModalNumero(event.target.valueAsNumber);
    };

    const handleOnSaveSelectType = (event: React.ChangeEvent<HTMLSelectElement>): void => {
        SetModalSelectType(event.target.value);
    };

    const handleSaveBases = async () => {
        try {
            await axios.put(`https://api-invest-m6y8.onrender.com/NewDados/${project?.id}`, {
                NewNome: ModalNome,
                NewNumero: ModalNumero,
                NewSelectType: ModalSelectType,
            });

            if (project) {
                project.nome = ModalNome;
                project.price = ModalNumero;
                project.opcao = ModalSelectType;
            }

            onHide();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Modal
            show={show}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Alterar Projeto
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="Form-Modal">
                    <h2>Nome do projeto</h2>
                    <input id="nomedoprojeto-modal" type="text" value={ModalNome} onChange={handleOnSaveModalNome} />
                    <h2>Orçamento do projeto</h2>
                    <input type="number" value={ModalNumero} onChange={handleOnSaveModalNumero} />
                    <h2>Selecione a categoria</h2>
                    <select name="" id="select-modal" value={ModalSelectType} onChange={handleOnSaveSelectType}>
                        <option value=""></option>
                        <option value="Infra">Infra</option>
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Design">Design</option>
                        <option value="Planejamento">Planejamento</option>
                    </select>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSaveBases}>Atualizar Projeto</Button>
                <Button onClick={onHide}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;
