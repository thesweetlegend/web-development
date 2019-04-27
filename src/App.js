import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {
  HashRouter as Router,
  Route,
  NavLink
} from 'react-router-dom';


class Home extends React.Component 
{  
  render () 
  {      
    return ( <h1>This is the main page!</h1> );
  }    
};
class Home2 extends React.Component 
{  
  render () 
  {      
    return ( <p>I usually put somethin here. But I dont have anything right now.</p>);
  }    
};
class About extends React.Component 
{  
  render () 
  {      
    return ( <h2>Developer: Jerome Aganon</h2>);
  }    
};

class About2 extends React.Component 
{  
  render () 
  {      
    return ( <p>Jerome is currently working as Software Developer at Bell Canada. 
      He is also currently taking Software Engineering Technology at McMaster University.</p> );
  }    
};
class About3 extends React.Component 
{  
  render () 
  {      
    return (<img src={logo} alt='logo'/>);
  }    
};

class Contact extends React.Component 
{  
  render () 
  {      
    return ( <h3>Contact Info</h3> );
  }    
};
class Contact2 extends React.Component 
{  
  render () 
  {      
    return ( <a href="https://www.linkedin.com/in/jeromeaganon/">My linkedin Profile</a> );
  }    
};
class Contact3 extends React.Component 
{  
  render () 
  {      
    return ( <form>
      <label>
        Name:
        <input type="text" name="name" />
        <br/>
        Last Name:
        <input type="text" name="name" />
        <br/>
      </label>
      <input type="submit" value="Submit" />
    </form>);
  }    
};


class LinkPage extends React.Component 
{  
  render () 
  {      
    return ( 
      <div>

        <CommentListClicked />
      </div>       
    );
  }    
};

/* 
  
  Example 3 - Events handlers with parameters

  Similar to our Comment List container pattern, only 
  now we will determine which comment was clicked.

  To pass a parameter to the event handler method, we use .bind 
  in the onClick event of each list element, and provide the 
  parameter as the second arugment.

  See: https://reactjs.org/docs/handling-events.html

*/
class CommentListClicked extends Component {
  
  constructor(props) 
  {
    super(props);
    this.state = 
    {
      comments: 
      [
        {body: "Wake up"},
        {body: "Eat Something"},
        {body: "Snooze"},
        {body: "Play Video Games"},
        {body: "Do nothing"},
      ],
      commentClicked: "" ,
      toshow: "",
      input: "",
      btn: "Add",
      toBeEdit: ""
    }
   }

   inputStateChange(event) {
    this.setState({input: event.target.value});
  }

  submitFunc= (e) => {
    if(this.state.toBeEdit === ""){
      this.setState((prevState) =>({
        toshow: this.state.input,
        comments : [...prevState.comments,{body:this.state.input}],
        input: ""
      }));
    }else{
      this.setState({   
        toshow: this.state.toBeEdit,
        comments: this.state.comments.filter(comments => comments['body'] !== this.state.toBeEdit)
      });
      this.setState((prevState) =>({
        toshow: this.state.input,
        comments : [...prevState.comments,{body:this.state.input}],
        input: "",
        toBeEdit: "",
        btn: "Add"
      }));
    }
 
  }

  handleSubmit = (e) => { e.preventDefault() }
  commentClickHandler(body) {
    this.setState({ 
      commentClicked: body 
    });       
  }

  onRemoveItem(body){
    console.log(body); 
    this.setState({   
      toshow: body,
      comments: this.state.comments.filter(comments => comments['body'] !== body)
    });
    console.log(JSON.stringify(this.state.comments));
  }

  onEditItem(body){
    console.log(body); 
    this.setState({   
      input: body,
      toBeEdit: body,
      btn: "Edit"
    });
  }
  /** 
  onRemoveItem (body)= i => {
    console.log(body);
    this.setState(state => {
      const comments = state.comments.filter((body, j) => i !== j);
      return {
        comments,
      };
    });
  };
*/
  renderComment({body, author}) { 
    return (  
        <li onClick={this.commentClickHandler.bind(this,body)} 
            key={body}>  
        {body}-----<button onClick={this.onEditItem.bind(this,body)}>Edit</button>-
        <button onClick={this.onRemoveItem.bind(this,body)}>Delete</button>  
        </li>
    );
  }

  render() {
    return (
      <div>
        <h1>Add TODO</h1>
        <input type="text" onChange={this.inputStateChange.bind(this)}
               value={this.state.input} />
        <button onClick={this.submitFunc.bind(this)}>{this.state.btn}</button>
        <h1>
         {this.state.toshow}
        </h1>   
        <h1>TODO List</h1>
        <h2>TODO clicked: {this.state.commentClicked}</h2>
        <ul> 
          {this.state.comments.map(this.renderComment.bind(this))} 
        </ul>
      </div>
    )
  }

};

// We can get at the url parameter with this.props.match.params 
// followed by the url parameter name defined in the route.  
/**
 * 
 
class URLParmExample extends React.Component 
{
  render()
  {
    return ( <p>URL parm: {this.props.match.params.someid} </p> );
  }
}
*/

class App extends React.Component 
{
  render ()
  {
    return (

      <Router>
        <div>
          <h1>Single Page Application</h1>
          <ul>
            {
              // Our NavLinks create navigiation links that React Router 
              // will associate with our routes.  NavLinks will use the 
              // active css class to style themselves when they are the 
              // active link.  See the active css class in App.css.  We
              // need to use the exact property for our root/home path 
              // otherwise home will always be considered active.
            }
            <li><NavLink exact to="/">Home</NavLink></li>
            <li><NavLink to="/about">About</NavLink></li>
            <li><NavLink to="/contact">Contact</NavLink></li>
            <li><NavLink to="/linkpage">TODO</NavLink></li>

          </ul>

          <hr/>
  
          {
            // Render a different component depending on the path, "/" is the 
            // "no path" case.  We add the property exact to have it render 
            // only on exact matches, otherwise "/" would also match for 
            // things like "/about".
          } 
          <Route exact path="/" component={Home}/>
          <Route path="/about" component={About}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/linkpage" component={LinkPage}/>
          


          {
            // We can have multiple components render in multiple areas by 
            // including multiple Route components.
          }
          <Route exact path="/" component={Home2} />
          <Route path="/about" component={About2} />
          <Route path="/about" component={About3} />
          <Route path="/contact" component={Contact2} />
          <Route path="/contact" component={Contact3} />

        </div>
      </Router>
    );
  }
}

export default App;
