import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css'

export class Modal extends Component {

  componentDidMount() {
    window.addEventListener('keydown', this.onEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEsc);
  }

  onEsc = event => {
    if (event.code === 'Escape') {
      this.props.closeModal();
    }
  };


render() {
  const {modalImage, onBackdrop} = this.props

    return(<div className={css.Overlay} onClick={onBackdrop}>
    <div className={css.Modal}>
      <img src={modalImage} alt="#" />
    </div>
  </div>)
  }
}





Modal.propTypes = {
  modalImage: PropTypes.string.isRequired,
  onBackdrop: PropTypes.func.isRequired,
}


// export const Modal = ({modalImage, onBackdrop}) => {

//   return(<div className={css.Overlay} onClick={onBackdrop}>
//   <div className={css.Modal}>
//     <img src={modalImage} alt="#" />
//   </div>
// </div>)
// }