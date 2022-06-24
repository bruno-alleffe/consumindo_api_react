import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import Form from "../project/Form"

function EditarContato() {
    let { id } = useParams()
    const history = useHistory()
    
    
    const [contato, setContato] = useState([])
    useEffect(() => {
        fetch(`https://api.box3.work/api/Contato/7259b70c-499e-49b7-8915-6a70f0b81f7f/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setContato(data)
        })
        .catch((err) => console.log(err)) 
    }, [id])

    function createPut(contato) {

        if ( contato.ativo === 'Selecione o status' || contato.ativo === '') {
            contato.ativo = true
        }

        fetch(`https://api.box3.work/api/Contato/7259b70c-499e-49b7-8915-6a70f0b81f7f/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contato),
        })
            .then((resp) => resp.json())
            .then((data) => {
                setContato(data)
                // Redirect
                history.push('/', {message: 'Contato atualizado com sucesso!'})
            })
            .catch((err) => console.log(err))
    }
    
    
    return (
        <div>
            <Form handleSubmit={createPut} contatoData={contato} valorBotao="Atualizar"/>
        </div>
    )
}

export default EditarContato