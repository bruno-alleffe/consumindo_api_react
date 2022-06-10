import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom'
import Form from "../project/Form"

function EditarContato() {
    let { id } = useParams()
    const history = useHistory()
    
    
    const [contato, setContato] = useState([])
    useEffect(() => {
        fetch(`https://api.box3.work/api/Contato/36092947-1c6d-4b24-856c-b31a4cebce82/${id}`, {
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

        fetch(`https://api.box3.work/api/Contato/36092947-1c6d-4b24-856c-b31a4cebce82/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contato),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
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