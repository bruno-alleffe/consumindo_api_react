import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { PhoneOutgoing } from 'heroicons-react'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      height: '80%'
    },
  };

Modal.setAppElement('#root')

function ModalHistoricoChamada({handleRemove, id}) {

    const [chamadas, setChamadas] = useState([])
    const [contato, setContato] = useState([])
 

    let subtitle
    const [modalIsOpen, setIsOpen] = useState(false)
    
    function openModal() {
      setIsOpen(true)

      fetch(`https://api.box3.work/api/Telefone/7259b70c-499e-49b7-8915-6a70f0b81f7f/contato/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setChamadas(data)
        })
        .catch((err) => console.log(err))
        
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
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false)
      console.log(chamadas);
      console.log(contato);
    }
    
    return (
        <div>
            <button onClick={openModal} className='mx-2 px-0 py-1'>
              <PhoneOutgoing className='h-6 w-6 text-orange-500 group-hover:text-orange-400'></PhoneOutgoing>
            </button>
            <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            className=""
            >
                <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
                {chamadas.length > 0 &&
                  chamadas.map((chamada) => (

                    <div className="p-6 text-center">
                      <div className="p-4 px-10 max-w-lg bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
                        <div className="flex flex-col items-center">
                            <img className="mb-3 w-24 h-24 rounded-full shadow-lg" src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="Imagem perfil"/>
                            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{contato.nome}</h5>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Assunto: {chamada.assunto}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Inicio chamada: {chamada.inicioAtendimento}</span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Fim chamada: {chamada.fimAtendimento}</span>
                        </div>
                      </div>
                    </div>
                ))}
                
            </Modal>
        </div>
    )
}

export default ModalHistoricoChamada