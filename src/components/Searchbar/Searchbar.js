import PropTypes from 'prop-types';
import { Component } from "react";
import { toast } from 'react-toastify';
import css from './Searchbar.module.css'
import { AiOutlineSearch } from 'react-icons/ai';

export class Searchbar extends Component {
    state = {
        imageName: ""
    }

    handleInputChange = (event) => {
     
      this.setState({imageName: event.currentTarget.value.toLowerCase()})
    }
    handleSubmit = (event) => {
      event.preventDefault()
      if(this.state.imageName.trim() === ""){
        toast.warn('Please, enter image name.');
    return
      } else {
    this.props.onFormSubmit(this.state.imageName)
    this.setState({imageName: ""})
       }
    }
    render() {
      
        return (<header className={css.Searchbar}>
          
        <form className={css.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.SearchForm__button}>
          <AiOutlineSearch size={23}/>
          </button>
      
      
          <input
            className={css.SearchForm__input}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="imageName"
            value={this.state.imageName}
            onChange={this.handleInputChange}
          />
        </form>
      </header>)
    }
}


Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
}