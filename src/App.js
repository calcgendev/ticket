import React,{Component} from 'react';
import axios from 'axios';
import './App.css';

class App extends Component{
  state = {
    name: '',
    message: '',
    email: '',
    sent: false,
    buttonText: 'SEND MESSAGE',
    attachment:'',
}

formSubmit = (e) => {
  e.preventDefault()

  this.setState({
      buttonText: '...sending'
  })

  let data = {
      name: this.state.name,
      email: this.state.email,
      message: this.state.message,
      attachment: this.state.attachment
  }
  
  axios.post('http://localhost:4444/send', data)
  .then( res => {
      this.setState({ sent: true }, this.resetForm())
  })
  .catch( () => {
    console.log('Message not sent')
    alert("Message send failed. Check internet connection!")
    this.resetForm2();
  })
}



resetForm = () => {
  this.setState({
      name: '',
      message: '',
      email: '',
      attachment:'',
      buttonText: 'MESSAGE SENT'
  })
}
resetForm2 = () => {
  this.setState({
      buttonText: 'SEND MESSAGE'
  })
}
uploadAttachment=(e)=>
{
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=(e)=>{
      this.setState({attachment: e.target.result});
    }
}
  render(){
    return(
    <div className="App">
    <form className="contact-form" onSubmit={ (e) => this.formSubmit(e)}>
    {/* <label class="message-name" htmlFor="message-name">Subject</label> */}
  <input className="title" onChange={e => this.setState({ name: e.target.value})} name="name" type="text" placeholder="Subject" value={this.state.name}/>
  {/* <label class="message"  htmlFor="message-input">Your Message</label> */}
  <br></br>
  <textarea  className= "message" onChange={e => this.setState({ message: e.target.value})} row="4" name="message"  type="text" placeholder="Please write your message here" value={this.state.message} required/>
  <br></br>
  <input name="attachment" type="file" ref="file" onChange={this.uploadAttachment} />
  <br></br>

  <div className="button--container">
      <button type="submit" className="submitter">{ this.state.buttonText }</button>
  </div>
</form>
    </div>
    )
  }
  ;
}

export default App;
