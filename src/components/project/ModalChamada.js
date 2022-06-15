import { useState, useEffect } from 'react';
import Modal from 'react-modal'
import { Phone } from 'heroicons-react'


const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };

Modal.setAppElement('#root')

function ModalChamada({handleRemove, id}) {

  const [chamada, setChamada] = useState([])
 

    let subtitle
    const [modalIsOpen, setIsOpen] = useState(false)
    const [time, setTime] = useState('')

    var hh = 0
    var mm = 0
    var ss = 0
    let cron = 0

    function openModal() {
      setIsOpen(true)
      

      let cron = setInterval(() => { 
          ss++; //Incrementa +1 na variável ss
    
          if (ss == 59) { //Verifica se deu 59 segundos
              ss = 0; //Volta os segundos para 0
              mm++; //Adiciona +1 na variável mm
    
              if (mm == 59) { //Verifica se deu 59 minutos
                  mm = 0;//Volta os minutos para 0
                  hh++;//Adiciona +1 na variável hora
              }
          }
    
          //Cria uma variável com o valor tratado HH:MM:SS
          var format = (hh < 10 ? '0' + hh : hh) + ':' + (mm < 10 ? '0' + mm : mm) + ':' + (ss < 10 ? '0' + ss : ss);
          
          //Insere o valor tratado no elemento counter
          document.getElementById('timer').innerText = format;
    
          //Retorna o valor tratado
          return format;
      }, 1000);
      setTime(cron)
  
      var dados = {
        idContato: id
      }
      
      var textoIdContato = `{"idContato": ${id}}`
      var idContato = JSON.parse(textoIdContato)

        fetch("https://api.box3.work/api/Telefone/7259b70c-499e-49b7-8915-6a70f0b81f7f", {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(dados),
          })
              .then((resp) => resp.json())
              .then((data) => {
                setChamada(data)
                console.log("Iniciou a chamada", data);
              })
              .catch((err) => console.log(err))
 
      
    }
  
    function afterOpenModal() {
      // references are now sync'd and can be accessed.
      subtitle.style.color = '#f00';
    }
  
    function closeModal() {
      setIsOpen(false)

     
      fetch('https://api.box3.work/api/Telefone/7259b70c-499e-49b7-8915-6a70f0b81f7f/chamada-em-andamento', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((resp) => resp.json())
        .then((data) => {
            setChamada(data)
        })
        .catch((err) => console.log(err))
        

      var assuntoChamada = document.getElementById('assuntoChamada').value
      var assunto = `{"assunto": "${assuntoChamada}"}`
      var assuntoC = JSON.parse(assunto)

      fetch(`https://api.box3.work/api/Telefone/7259b70c-499e-49b7-8915-6a70f0b81f7f/${chamada.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(assuntoC),
        })
            .then((resp) => resp.json())
            .then((data) => {
              console.log("Encerrou a Chamada", data);
            })
            .catch((err) => console.log(err))

      clearInterval(cron);
      clearInterval(time); 
      hh = 0;
      mm = 0;
      ss = 0;
      document.getElementById('timer').innerText = '00:00:00';
    }
    
    return (
        <div>
            <button onClick={openModal} className='mx-1 px-0 py-1'>
              <Phone className='h-6 w-6 text-green-500 group-hover:text-green-400'></Phone>
            </button>
            <Modal
            isOpen={modalIsOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
                <button onClick={closeModal} type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-toggle="popup-modal">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>  
                </button>
                <div className="p-6 text-center">
                  <img className="mx-auto mb-4 w-40 h-40 rounded-full" src="https://cdn.iconscout.com/icon/free/png-256/avatar-370-456322.png" alt="admin dashboard ui" />
                  <h3 className="mb-0 text-lg font-normal text-gray-500 dark:text-gray-400">Chamada em andamento...</h3>
                  <h3 id='timer' className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">''</h3>
                  <label htmlFor="exampleFormControlTextarea1" className="form-label inline-block mb-2 text-lg font-normal text-gray-500 dark:text-gray-400"
                  >Digite sua mensagem</label
                  >
                  <textarea
                    className="mb-4 form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    id="assuntoChamada"
                    rows="3"
                    placeholder="Sua mensagem..."
                  ></textarea>
                  <button onClick={closeModal} data-modal-toggle="popup-modal" type="button" className="w-96 text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex flex justify-center items-center px-5 py-2.5 text-center">
                    Encerrar chamada
                  </button>
                </div>
            </Modal>
        </div>
    )
}

export default ModalChamada