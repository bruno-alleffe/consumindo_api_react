import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import Form from "../project/Form"

function InserirContato() {
    const history = useHistory()

    function createPost(contato) {

        if ( contato.ativo === 'Selecione o status' || contato.ativo === '') {
            contato.ativo = true
        }

        fetch('https://api.box3.work/api/Contato/7259b70c-499e-49b7-8915-6a70f0b81f7f', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(contato),
        })
            .then((resp) => resp.json())
            .then((data) => {
                console.log(data)
                // Redirect
                history.push('/', {message: 'Contato adicionado com sucesso!'})
            })
            .catch((err) => console.log(err))
    }
    

    return (
        <div>
            <Form handleSubmit={createPost}/>
        </div>
    
    )
}

export default InserirContato