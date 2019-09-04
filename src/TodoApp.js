import React, { Component } from 'react';
import app from "./base";
import './App.css';

class TodoApp extends Component 
{

  state = { currentUser: null }
  componentDidMount() 
  {
      const { currentUser } = app.auth()
      this.setState({ currentUser })
  }

  constructor()
  {
    super();
    this.state = { works: JSON.parse(localStorage.getItem('works')) };
  }

  add()
  {
    var title = this.refs.title.value;
    if(localStorage.getItem('works') == null)
    {
      var works = [];
      works.push(title);
      localStorage.setItem('works', JSON.stringify(works));
    }
    else
    {
      var works = JSON.parse(localStorage.getItem('works'));
      works.push(title);
      localStorage.setItem('works', JSON.stringify(works));
    }
    this.setState({
      works: JSON.parse(localStorage.getItem('works'))
    });
  }

  delete(e)
  {
    var index = e.target.getAttribute('data-key');
    var list = JSON.parse(localStorage.getItem('works'));
    list.splice(index, 1);
    this.setState({
      works: list
    });
    localStorage.setItem('works', JSON.stringify(list));
  }

  render()
  {
    const { currentUser } = this.state
    return(
      <div>
        <h3>Welcome {currentUser && currentUser.email}!</h3>
        <input type = "text" placeholder = "Title..." ref="title"/>
        <input type="button" value="Add" onClick={this.add.bind(this)}/>
        <br/><br/>
        <ul>
          {
            this.state.works.map(function(work, index)
            {
              return(
                <li key = {index}>{work} <input type = "button" value = "x" onClick={this.delete.bind(this)} data-key={index}/></li>
              );
            }, this)
          }
        </ul>
        <button onClick={() => app.auth().signOut()}> Log Out</button>
      </div>
    );
  }
}

export default TodoApp;
