import { Component } from "react";

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
    alert("Enter image name")
    return
      } else {
    this.props.onFormSubmit(this.state.imageName)
       }
    }
    render() {
      
        return (<header className="searchbar">
        <form className="form" onSubmit={this.handleSubmit}>
          <button type="submit" className="button">
            <span className="button-label">Search</span>
          </button>
      
          <input
            className="input"
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