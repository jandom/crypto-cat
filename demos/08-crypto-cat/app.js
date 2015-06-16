
var CryptoCat = React.createClass({
  getInitialState: function() {
	return {password : "sntaoheuaseouthao" };
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var password = React.findDOMNode(this.refs.password).value.trim();
    if (!password ) {
       this.setState({password: ' '});
       return;
    }
    this.setState({password: password});
  },  

  render: function() {

  	var entityNodes = this.props.messages.map( function(entity) {
  		var decrypted =  CryptoJS.AES.decrypt(entity, this.state.password );

  		var plaintext = "";
		try {
  			plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  		}
  		catch (err) {
  			console.log(err);
  		}

  		var data = null;

  		if (plaintext.indexOf(' ') <= 0) {
  			plaintext = entity.ciphertext;
  		} else {
  			data = JSON.parse(plaintext);
  			console.log(data);
  		}


  		if (data)  {
  			return <tr><td><img className="picture" src={ data.picture} /><b>{data.name}</b> { data.text }</td></tr>
  		} else {
  			return <tr><td>No picture<br/><b>Unknown sender</b> <span>{ plaintext }</span></td></tr>
  		}


  		
  	}, this );

    return (
    	<div className="container">
	      <h1>Chat – Hello crypto cats!</h1>
	      <form className="passwordForm" onSubmit={this.handleSubmit}>
	        <input type="text" ref="password" placeholder="For the Watch..." />
	        <input type="submit" value="Decrypt" />
	      </form>	      
	      <table className="table table-striped">
	      	{ entityNodes }
	      </table>
      	</div>
    );
  }
})

React.render(<CryptoCat messages={messages} />, document.getElementById('cryptocat'), function() {
  console.log(Date.now());
});
