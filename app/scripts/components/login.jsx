var login = React.createClass({
  propTypes: {},
  getInitialState:  function () {
    return {
      errorMsg : ""
    }
  },
  login:function(point){
    /*if(this.refs.username.value.length>0 && this.refs.password.value.length>0){
      this.props.login(this.refs.username.value,this.refs.password.value);
    }
    else{
      $('errorMsg').html("Please enter username and password");
      setTimeout(function(){
        // $('errorMsg').html("");
      },4000);
      
      

    }*/
    this.props.login(this.refs.username.value,this.refs.password.value);
  },

  render: function () {
    var loginProps = this.props;
    var self=this;

    return (
      <div className='row'>
      <div className='col-md-4'></div>
      <div className='col-md-4'>
      <div className='loginContainer'>
      <div className="form-group">
      <div className="input-group">
      <label htmlFor="uname">Username:</label>
      <input type="text" ref="username" id="uname" className='form-control' placeholder="Enter username"/>
      </div>
      </div>
      <div className="form-group">
      <div className="input-group">
      <label htmlFor="pwd">Password:</label>
      <input type="password" ref="password" id="pwd" className='form-control' placeholder="Enter password" />
      </div>
      </div>
      <div className="form-group">
      <div className="input-group">
      <button className="loginbutton" onClick={this.login.bind(this,self)}>Login</button>
      <errorMsg>{loginProps.loginError}</errorMsg>
      </div>
      </div>
      </div>
      </div>
      <div className='col-md-4'></div>
      </div>
      );
  }

});

moviesApp.value('login', login);
