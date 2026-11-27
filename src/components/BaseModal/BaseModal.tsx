import React, { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './BaseModal.module.css'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
  /** classe extra no modal, ex: para aumentar a largura */
  className?: string
}

function BaseModal({ isOpen, onClose, title, children, className }: BaseModalProps) {
  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  // ao fechar, devolve o foco para o elemento que abriu o modal
  useEffect(() => {
    if (!isOpen) return
    const anterior = document.activeElement as HTMLElement | null
    return () => anterior?.focus()
  }, [isOpen])

  if (!isOpen) return null

  // portal no body: dentro da seção, o z-index dela prenderia o modal atrás da navbar
  return createPortal(
    <div className={styles.backdrop} onClick={onClose}>
      <div
        className={`${styles.modal} ${className ?? ''}`}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <div className={styles.header}>
          <h2 className={styles.title}>{title}</h2>
          <button
            type="button"
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar"
            autoFocus
          >
            ×
          </button>
        </div>
        <div className={styles.body}>{children}</div>
      </div>
    </div>,
    document.body
  )
}

export default BaseModal
