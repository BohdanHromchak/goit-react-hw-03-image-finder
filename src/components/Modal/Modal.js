import PropTypes from 'prop-types';
import css from './Modal.module.css'

export const Modal = ({modalImage, onBackdrop}) => {

    return(<div className={css.Overlay} onClick={onBackdrop}>
    <div className={css.Modal}>
      <img src={modalImage} alt="#" />
    </div>
  </div>)
}
Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  onBackdrop: PropTypes.func.isRequired,
}