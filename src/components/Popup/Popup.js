import { useEffect, useRef } from 'react'
import s from './Popup.module.scss'
import PropTypes from 'prop-types'
import { useOnClickOutside } from 'hooks/useOnClickOutside'

const Popup = ({ message, handleClose, children }) => {
  const popupRef = useRef(null)
  useOnClickOutside(popupRef, handleClose)
  useEffect(() => {
    if (message) {
      const id = setTimeout(handleClose, 4000)
      return () => clearTimeout(id)
    }
  }, [handleClose, message])
  return (
    <div className={s.popupWrap}>
      <div className={s.popup} ref={popupRef}>
        {children || <span className={s.message}>{message}</span>}
      </div>
    </div>
  )
}
Popup.propTypes = {
  message: PropTypes.string,
  handleClose: PropTypes.func
}
Popup.defaultProps = {
  message: '',
  handleClose: () => {}
}

export default Popup
