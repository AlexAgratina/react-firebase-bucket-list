import React, { Component } from 'react';
import Wish from './Wish/Wish';
import WishForm from './WishForm/WishForm';
import { DB_CONFIG } from './Config/config';
import firebase from 'firebase/app';
import 'firebase/database';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.addWish = this.addWish.bind(this);
    this.removeWish = this.removeWish.bind(this);

    this.app = firebase.initializeApp(DB_CONFIG);
    this.database = this.app.database().ref().child('wishes');

    // Stetting up the React state of our component
    this.state ={
      wishes: [],
    }
  }

  componentWillMount(){
    const previousWishes = this.state.wishes;

    // DataSnapshot
    this.database.on('child_added', snap => {
      previousWishes.push({
        id: snap.key,
        wishContent: snap.val().wishContent,
      })

      this.setState({
        wishes: previousWishes
      })
    })

    this.database.on('child_removed', snap => {
      for(var i=0; i < previousWishes.length; i++){
        if(previousWishes[i].id === snap.key){
          previousWishes.splice(i, 1);
        }
      }

      this.setState({
        wishes: previousWishes
      })
    })
  }

  addWish(wish){
    this.database.push().set({ wishContent: wish });
  }

  removeWish(wishId){
    console.log("from the parent: " + wishId);
    this.database.child(wishId).remove();
  }

  render() {
    return (
      <div className="wishesWrapper">
        <div className="wishesHeader">
          <div className="heading">React and Firebase Bucket List</div>
        </div>
        <div className="wishesBody">
          {
            this.state.wishes.map((wish) => {
              return(
                <Wish wishContent={wish.wishContent}
                wishId={wish.id}
                key={wish.id}
                removeWish={this.removeWish}/>
              )
            })
          }
        </div>
        <div className="wishesFooter">
          <WishForm addWish={this.addWish}/>
        </div>
      </div>
    );
  }
}

export default App;
