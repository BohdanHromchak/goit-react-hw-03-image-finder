import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-notifications/lib/notifications.css';
import { fetchImages } from 'services/image-api';
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Loader } from './Loader/Loader';
import {Button} from './Button/Button'
import css from './App.module.css'

export class App extends Component {
  state = {
    imageName: null,
    images: [],
    status: "idle",
    page: 1
  }

componentDidUpdate(_, prevState) {
  
const prevImageName = prevState.imageName
const nextImageName = this.state.imageName
const prevPage = prevState.page
const nextPage = this.state.page

if(prevImageName !== nextImageName) {
  this.setState({ status: "pending", page: 1})
  fetchImages(this.state.imageName, this.state.page).then(images => {

   if(images.totalHits === 0) {
     this.setState({status: "idle"})
     toast.error('Sorry, there are no images matching your search query. Please try again.')
     return
   }else{this.setState({images: images.hits, status: "resolved"})}
  }).catch(() => {this.setState({status: "idle"})}).finally(() => this.setState({tatus: "idle"}))
}
if(prevPage !== nextPage) {
  fetchImages(this.state.imageName, this.state.page).then(images => {if(images.hits === 0){
   return this.setState({status: "idle"})
  }else{
    this.setState({images: [...this.state.images, ...images.hits]})
  }})
}

}

handleFormSubmit = (imageName) => {
  this.setState({imageName})
  this.setState({status: "idle"})
}

handleLoadMore = () => {
this.setState((prevState) => ({
  page: prevState.page + 1
}))

}
  render() {

    const {images, status} = this.state
    return(
      <div className={css.App}>
      <Searchbar onFormSubmit={this.handleFormSubmit}/>

{(status === "resolved") && (<>
<ImageGallery images={images}/> 
<Button onClick={this.handleLoadMore}/>
</>)}
{(status === "pending") && <Loader/>}
<ToastContainer autoClose={2500} />
      </div>
    )
  }
}


