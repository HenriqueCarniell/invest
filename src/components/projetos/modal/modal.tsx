import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './modal.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface MyModalProps {
    show: boolean;
    onHide: () => void;
}

interface MyDataType {
    id: number,
    nome: string,
    price: number,
    opcao: string,
}

function MyModal(props: MyModalProps) {

    const [ModalNome, SetModalNome] = useState<string>('');
    const [ModalNumero, SetModalNumero] = useState<number>(0);
    const [ModalSelectType, SetModalSelectType] = useState<string>('')

    const [Data, SetData] = useState<MyDataType[]>([])

    let HandleOnSaveModalNome = (event: React.ChangeEvent<HTMLInputElement>):void => {
        SetModalNome(event.target.value);
    }

    let HandleOnSaveModalNumero = (event: React.ChangeEvent<HTMLInputElement>):void => {
        SetModalNumero(event.target.valueAsNumber);
    }

    let HandleOnSaveSelectType = (event: React.ChangeEvent<HTMLSelectElement>):void => {
        SetModalSelectType(event?.target.value);
    }

    useEffect(() => {
        axios.get("https://api-invest.vercel.app/dados")
            .then(response => {
                SetData(response.data)
            }) 
    }, [])

    let HandleSaveBases = async (id: number) => {
        try {
            await axios.put(`https://api-invest.vercel.app/NewDados/${id}`, {
                NewNome: ModalNome,
                NewNumero: ModalNumero,
                NewSelectType: ModalSelectType,
            });
            SetData(Data.map(item => item.id === id ? { ...item, nome: ModalNome, price: ModalNumero, opcao: ModalSelectType } : item));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div id="Form-Modal">
                    <h2>Nome do projeto</h2>
                    <input id="nomedoprojeto-modal" type="text" onChange={HandleOnSaveModalNome} />
                    <h2>Orçamento do projeto</h2>
                    <input type="number" onChange={HandleOnSaveModalNumero} />
                    <h2>Selecione a categoria</h2>
                    <select name="" id="select-modal" onChange={HandleOnSaveSelectType}>
                        <option value=""></option>
                        <option value="Infra">Infra</option>
                        <option value="Desenvolvimento">Desenvolvimento</option>
                        <option value="Design">Design</option>
                        <option value="Planejamento">Planejamento</option>
                    </select>
                </div>

            </Modal.Body>
            <Modal.Footer>
                {Data.map((item) => (
                    <Button key={item.id} onClick={() => { HandleSaveBases(item.id); props.onHide() }}>Atualizar Projeto</Button>
                ))}
            </Modal.Footer>
        </Modal>
    );
}

export default MyModal;
