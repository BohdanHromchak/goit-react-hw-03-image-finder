import { Component } from 'react';
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { fetchImages } from 'services/image-api';

export class App extends Component {
  state = {
    imageName: null,
    images: null,
    status: null,
    page: 1
  }

  handleFormSubmit = (imageName) => {
    this.setState({imageName})
  }

componentDidUpdate(prevProps, prevState) {
const prevImageName = prevState.imageName
const nextImageName = this.state.imageName
if(prevImageName !== nextImageName) {
  fetchImages(this.state.imageName, 1).then(images => {
   this.setState({images: images.hits, status: "resolved"})
  })
}
}


  render() {
const {images, status} = this.state
    return(
      <>
      <Searchbar onFormSubmit={this.handleFormSubmit}/>
{(status === "resolved") && <ImageGallery images={this.state.images}/>}
      
      </>
    )
  }
}