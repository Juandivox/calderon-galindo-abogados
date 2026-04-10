import { createContext, useContext, useState } from 'react'

const ModalContext = createContext(null)

export function ModalProvider({ children }) {
  const [modal, setModal] = useState({ visible: false, title: '', message: '' })

  const showModal = (title, message) => setModal({ visible: true, title, message })
  const closeModal = () => setModal((m) => ({ ...m, visible: false }))

  return (
    <ModalContext.Provider value={{ showModal, closeModal }}>
      {children}
      {modal.visible && (
        <div
          className="fixed inset-0 bg-negro-profundo bg-opacity-70 flex items-center justify-center p-4"
          style={{ zIndex: 1000, backdropFilter: 'blur(4px)' }}
        >
          <div className="bg-blanco-puro p-8 rounded-xl shadow-2xl max-w-sm w-full animate-modal-in">
            <h3 className="font-titulo text-lg font-semibold mb-3 text-verde-institucional">
              {modal.title}
            </h3>
            <p className="font-cuerpo text-negro-profundo mb-6">{modal.message}</p>
            <button
              onClick={closeModal}
              className="w-full bg-verde-institucional text-blanco-puro font-medium py-2 rounded-lg hover:bg-opacity-90 transition duration-300"
            >
              Aceptar
            </button>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  )
}

export const useModal = () => useContext(ModalContext)
