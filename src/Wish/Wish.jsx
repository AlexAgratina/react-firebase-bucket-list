import React, { Component } from 'react';
import './Wish.css';
import PropTypes from 'prop-types';

class Wish extends Component{

  constructor(props){
    super(props);
    this.wishContent = props.wishContent;
    this.wishId = props.wishId;
    this.handleRemoveWish = this.handleRemoveWish.bind(this);
  }

  handleRemoveWish(id){
    this.props.removeWish(id);
  }

  render(){
    return(
      <div className="wish fade-in">
        <span className="closebtn"
              onClick={() => this.handleRemoveWish(this.wishId)}>
              &times;
        </span>
        <p className="wishContent">{ this.wishContent }</p>
      </div>
    )
  }
}

Wish.propTypes = {
  wishContent: PropTypes.string
}

export default Wish;
