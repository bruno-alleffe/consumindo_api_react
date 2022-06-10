import { Link } from 'react-router-dom'
import { Sparkles } from 'heroicons-react'
import { X } from 'heroicons-react'
import { useState, useEffect } from 'react';
import Input from '../form/Input';

function Form({ handleSubmit, contatoData, valorBotao, id }) {
    const [contato, setContato] = useState(contatoData || {})

    useEffect(() => {
        setContato(contatoData || {} )
    }, [contatoData])
    

    

    const submit = (e) => {
        e.preventDefault()
        // console.log(contato)
        handleSubmit(contato)
    }

    
    function handleChange(e) {
        setContato({ ...contato, [e.target.name]: e.target.value})
    }

    function handleStatus(e) {
        setContato({ ...contato, ativo: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
            },
        })
    }

    /* Máscaras ER */
    function mascara(o,f){
        var v_obj=o
        var v_fun=f
        setTimeout(execmascara(v_obj, v_fun),1)
    }
    function execmascara(v_obj, v_fun){
        v_obj.value=v_fun(v_obj.value)
    }
    function mtel(v){
        v=v.replace(/\D/g,""); //Remove tudo o que não é dígito
        v=v.replace(/^(\d{2})(\d)/g,"($1) $2"); //Coloca parênteses em volta dos dois primeiros dígitos
        v=v.replace(/(\d)(\d{4})$/,"$1-$2"); //Coloca hífen entre o quarto e o quinto dígitos
        return v;
    }
    function id( el ){
        return document.getElementById( el );
    }
    function executaMascara() {
        id('telefone').onkeyup = function(){
            mascara( this, mtel );
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg w-full space-y-8 bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div>
                    <img
                    className="mx-auto h-12 w-auto"
                    src="https://box3.work/images/logo.png"
                    alt="Workflow"
                    />
                    <h2 className="mt-4 text-center text-3xl font-extrabold text-gray-900">Cadastrar um novo contato</h2>
                </div>
                <form className="mt-2 space-y-3" onSubmit={submit}>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Nome:
                        </label>
                        <input value={contato.nome} onChange={handleChange} type="text" name="nome" id="nome" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="nomeHelp" placeholder="Nome" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Telefone:
                        </label>
                        <input value={contato.telefone} onChange={handleChange} onKeyDown={executaMascara} type="tel" name="telefone" id="telefone" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="foneHelp" required minLength="15" maxLength="15" placeholder="(xx) xxxxx-xxxx" />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Email:
                        </label>
                        <input value={contato.email} onChange={handleChange} type="email" name="email" id="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="emailHelp" placeholder="Email" required />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Status:
                        </label>
                        <select value={contato.ativo} onChange={handleChange} name="ativo" id="ativo" className="form-select rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" required>
                            <option value={null}>Selecione o status</option>    
                            <option value={true}>Ativo</option>
                            <option value={false}>Desativado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Data de Nascimento:
                        </label>
                        <input value={contato.dataNascimento} onChange={handleChange} type="date" name="dataNascimento" id="dataNascimento" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" aria-describedby="dataHelp" placeholder="dataNascimento" required />
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <Link
                        to="/"
                        className="group relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-neutral-400 hover:bg-neutral-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <X className="h-5 w-5 text-stone-300 group-hover:text-stone-200" aria-hidden="true" />
                            </span>
                            Cancelar
                        </Link>
                        <button
                        type="submit"
                        className="group relative w-48 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                                <Sparkles className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                            {valorBotao ? "Atualizar" : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
       
    )
}

export default Form