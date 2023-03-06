import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './ImageGalleryItem.module.css'
import {Modal} from '../Modal/Modal'


export class ImageGalleryItem extends Component {

state = {
showModal: false
}
openModal = () => {
   this.setState({showModal: true})
}
closeModal = () => {
   this.setState({showModal: false})
}
handleBackdropClick = (event) => {
   if(event.target === event.currentTarget) {
     this.setState({showModal: false})
   }
  }

   render() {
      const {image: {id, webformatURL,largeImageURL, tags}} = this.props

      return(
         <>
             <li id={id} className={css.ImageGalleryItem}>
    <img src={webformatURL} alt={tags} className={css.ImageGalleryItem__image} onClick={this.openModal}/>
  </li>
  {this.state.showModal && <Modal onBackdrop={this.handleBackdropClick} closeModal={this.closeModal} modalImage={largeImageURL} alt={tags}/>}
</>
      )
   }
}


ImageGalleryItem.propTypes = {
   image: PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
      tags: PropTypes.string.isRequired,
   }).isRequired
}