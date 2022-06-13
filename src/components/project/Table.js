import { Link } from 'react-router-dom'
import { FaFirstOrderAlt } from "react-icons/fa";
import ModalDeletar from './ModalDeletar';



function Table({ contatos, handleRemove }) {
    
    const remove = (e) => {
        e.preventDefault()
        const el = e.target || e.srcElement
        const id = el.id
        handleRemove(id)
    }

    // function formataData(data) {
    //     let dataFormatada = (data.getFullYear() + "-" + ((data.getMonth() + 1)) + "-" + (data.getDate() )) ;
    //     return dataFormatada
    // }
    
    return (
        
        <div className="min-h-screen py-16">
            <div className='overflow-x-auto w-full'>
                <div className="flex items-center p-6 justify-between mx-auto max-w-6xl w-full whitespace-nowrap rounded-t-lg bg-white divide-y divide-gray-300 overflow-hidden shadow-md">
                    <p className="text-2xl font-semibold font-mono text-gray-600">Contatos</p>
                    
                    <Link 
                    to='/adicionar'
                    className="group relative w-40 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Adicionar
                    </Link>
                </div>
                <table className='mx-auto max-w-6xl w-full whitespace-nowrap rounded-b-lg bg-white divide-y divide-gray-300 overflow-hidden shadow-md'>
                    <thead className="bg-gray-100">
                        <tr className="text-white text-left">
                            <th className="font-semibold text-sm uppercase px-6 py-4 text-gray-500"> Nome </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 text-gray-500"> Telefone </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 text-gray-500"> Email </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 text-gray-500"> Status </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4 text-gray-500"> Data de Nasc. </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                            <th className="font-semibold text-sm uppercase px-6 py-4"> </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                    {contatos.length > 0 &&
                        contatos.map((contato) => (

                            <tr key={contato.id}>
                                <td className="px-6 py-4">
                                        
                                    <p className="text-gray-500"> {contato.nome} </p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-500">{contato.telefone}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className="text-gray-500"> {contato.email} </p>
                                </td>
                                <td className="px-2 py-4 flex items-center justify-center">
                                    {contato.ativo === true ? <FaFirstOrderAlt className="text-green-500 text-center"></FaFirstOrderAlt> : <FaFirstOrderAlt className="text-red-500"></FaFirstOrderAlt>}
                                </td>
                                
                                <td className="px-6 py-4">
                                    <p className="text-gray-500"> { formataData(contato.dataNascimento) } </p>
                                </td>
                                <td className="px-1 py-4">
                                    <Link to={`/editarContato/${contato.id}`} className="mx-3 px-4 py-1 text-sm text-blue-600 bg-blue-200 rounded-full">Editar</Link>
                                <button onClick={remove} id={contato.id} className="px-4 py-1 text-sm text-red-400 bg-red-200 rounded-full">Deletar</button>
                                <ModalDeletar id={contato.id} handleRemove={handleRemove}/>
                                </td>
                            </tr>
                            
                        ))}
                </tbody>
            </table>
        </div>
    </div>
    )
}

export default Table