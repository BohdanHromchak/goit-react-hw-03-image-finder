import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-notifications/lib/notifications.css';
import { fetchImages } from 'services/image-api';
import {Searchbar} from './Searchbar/Searchbar'
import {ImageGallery} from './ImageGallery/ImageGallery'
import { Loader } from './Loader/Loader';

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
    return this.setState({status: "rejected"})
   }else{this.setState({images: images.hits, status: "resolved"})}
  }).catch(() => {this.setState({status: "rejected"})}).finally(() => this.setState({tatus: "idle"}))
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
    console.log(this.state.status)

    const {images, status} = this.state
    return(
      <>
      <Searchbar onFormSubmit={this.handleFormSubmit}/>

{(status === "resolved") && (<>
<ImageGallery images={images}/> 
<button onClick={this.handleLoadMore}>Load more</button>
</>)}
{(status === "pending") && <Loader/>}
{(status === "rejected") && (toast.error('Sorry, there are no images matching your search query. Please try again.'))}
<ToastContainer autoClose={2500} />
      </>
    )
  }
}


// componentDidUpdate(_, prevState) {
  
//   const prevImageName = prevState.imageName
//   const nextImageName = this.state.imageName
//   const prevPage = prevState.page
//   const nextPage = this.state.page
  
//   if(prevImageName !== nextImageName || prevPage !== nextPage) {
//     this.setState({isLoading: true, status: null})
//     fetchImages(this.state.imageName, this.state.page).then(images => {
//      if(images.totalHits === 0) {
//        this.setState({status: "rejected"})
//      }else{this.setState({images: [...this.state.images, ...images.hits], status: "resolved"})}
//     }).catch(() => {this.setState({status: "rejected"})}).finally(() => this.setState({isLoading: false}))
//   }
//   }