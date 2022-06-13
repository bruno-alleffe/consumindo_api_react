import { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Loading from '../layout/Loading'
import Message from '../layout/Message'
import Table from "../project/Table"
import Modal from '../project/Modal'
import Modal2 from '../project/Modal2'



function ListaContatos() {
    const [removeLoading, setRemoveLoading] = useState(false)
    const [contatoMessage, setContatoMessage] = useState('')
    const [showModal, setShowModal] = useState(false);
    
    const location = useLocation()
    let message = ''
    if (location.state) {
        message = location.state.message
    }
    

    const [contatos, setContatos] = useState([])
    useEffect(() => {
        setTimeout(() => {
            fetch('https://api.box3.work/api/Contato/36092947-1c6d-4b24-856c-b31a4cebce82', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setContatos(data)
                setRemoveLoading(true)
            })
            .catch((err) => console.log(err)) 
        }, 800);
    }, [])
    
    function removerContato(id) {
        fetch(`https://api.box3.work/api/Contato/36092947-1c6d-4b24-856c-b31a4cebce82/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setContatos(contatos.filter((contato) => contato.id !== id))
            setContatoMessage('Contato removido com sucesso!')
            setRemoveLoading(false)
            
        })
        .catch((err) => console.log(err))
        
        setTimeout(() => {
            fetch('https://api.box3.work/api/Contato/36092947-1c6d-4b24-856c-b31a4cebce82', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            })
            .then((resp) => resp.json())
            .then((data) => {
                setContatos(data)
                setRemoveLoading(true)
                 setContatoMessage('')
            })
            .catch((err) => console.log(err)) 
        }, 300);
        
    }
    
    return (
        <section className='bg-gray-100 h-full'>
            {message && <Message type="success" msg={message} />}
            {contatoMessage && <Message type="success" msg={contatoMessage} />}
            {!removeLoading && <Loading />}
            {removeLoading && contatos.length === 0 && (
                <div className='flex'>
                <div className='justify-center mx-auto mt-10 bg-red-200 w-6/12 h-1/2 p-6 text-center'>
                    <p className='text-xl text-gray-500'>Não há contatos cadastrados!</p>
                </div>
                </div>
                
                
            )}
            {removeLoading && <Table contatos={contatos} handleRemove={removerContato} />}
            
        </section>
    )
}

export default ListaContatos