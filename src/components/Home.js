import React, { Component } from 'react';
import AccountBalance from './AccountBalance';
import {Link} from 'react-router-dom';
    
    class Home extends Component {
      render() {

        return (
            <div>
              <img src="https://www.freeiconspng.com/thumbs/bank-icon/bank-icon-15.png" alt="logo" width="100" height="100"></img>
              <h1>Bank of React</h1>
              <Link to="/userProfile">User Profile</Link>
              <br></br>
              <Link to="/debits">Debits</Link>
              <br></br>
              <Link to="/credits">Credits</Link>
              <AccountBalance accountBalance={this.props.accountBalance} debits={this.props.debits} credit={this.props.credit} totalAccountBalance={this.props.totalAccountBalance}/>
            </div>
        );
      }
    }
    
    export default Home;