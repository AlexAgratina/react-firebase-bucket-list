import React, { Component } from 'react';
import './WishForm.css';

class WishForm extends Component{
  constructor(props){
    super(props);
    this.state = {
      newWishContent: '',
    };

    this.handleUserInput = this.handleUserInput.bind(this);
    this.writeWish = this.writeWish.bind(this);
  }

  handleUserInput(e){
    this.setState({
      newWishContent: e.target.value, // the value of the input
    })
  }

  writeWish(){
    this.props.addWish(this.state.newWishContent);

    this.setState({
      newWishContent: '',
    })
  }

  render(){
    return(
      <div className="formWrapper">
        <input className="wishInput"
        placeholder="Write a new wish..." 
        value={this.state.newWishContent}
        onChange={this.handleUserInput} />
        <button className="wishButton"
        onClick={this.writeWish}>Add Wish</button>
      </div>
    )
  }
}

export default WishForm;