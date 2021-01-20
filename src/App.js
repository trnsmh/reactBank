import React, {Component} from 'react';
import {BrowserRouter as Router,Route} from 'react-router-dom';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import LogIn from './components/Login';
import Debit from './components/Debit';
import Credit from './components/Credit';
import axios from 'axios';
    
    class App extends Component {
      constructor() {
        super();

        this.state = {
          accountBalance: 14568.27,
          totalDebit: 0,
          totalCredit: 0,
          currentUser: {
            userName: 'bob_loblaw',
            memberSince: '08/23/99'
          },
          debitData: [],
          creditData: [],
        }
        this.updateDebit = this.updateDebit.bind(this);
        this.updateCredit = this.updateCredit.bind(this);

        
      }

      componentDidMount(){
        let debits=0 
        let credit=0
        //fetching debit data
        axios.get("https://moj-api.herokuapp.com/debits")        
            .then((response) =>{               
                    this.setState({
                        debitData: response.data
                    })
                    response.data.forEach((data)=>{
                        debits += data.amount
                    })
                    this.setState({
                        totalDebit: debits
                    })
            })
        //fetching credit data     
        axios.get("https://moj-api.herokuapp.com/credits")
        .then((response) =>{               
                    this.setState({
                        creditData: response.data
                    })
                    response.data.forEach((data)=>{
                        credit += data.amount
                    })
                    this.setState({
                        totalCredit: debits
                    })
            })
      }

      updateDebit(object){
        this.state.debitData.push(object)
        this.setState({
          totalDebit: this.state.totalDebit + Number(object.amount)
        })
      }

      updateCredit(object){
        this.state.creditData.push(object)
        this.setState({
          totalCredit: this.state.totalCredit + Number(object.amount)
        })
      }

      mockLogIn = (logInInfo) => {
        const newUser = {...this.state.currentUser}
        newUser.userName = logInInfo.userName
        this.setState({currentUser: newUser})
      }

      render() {
        console.log()
        let accountBalance=this.state.accountBalance
        let debits=this.state.totalDebit
        let credit = this.state.totalCredit
        let totalAccountBalance = accountBalance + debits - credit
        const HomeComponent = () => (<Home accountBalance={accountBalance} debits={debits} credit={credit} totalAccountBalance={totalAccountBalance}/>);
        const UserProfileComponent = () => (
        <UserProfile userName={this.state.currentUser.userName} memberSince={this.state.currentUser.memberSince} />);
        const LogInComponent = () => (<LogIn user={this.state.currentUser} mockLogIn={this.mockLogIn} {...this.props}/>)
        const debitComponent = () => (<Debit totalAccountBalance={totalAccountBalance} updateBalance={this.updateDebit} data={this.state.debitData} />)
        const creditComponent = () =>(<Credit totalAccountBalance={totalAccountBalance} updateBalance={this.updateCredit} data={this.state.creditData}/>)
        return (
          <Router>            
              <Route exact path="/" render={HomeComponent}/>
              <Route exact path="/userProfile" render={UserProfileComponent}/>  
              <Route exact path="/login" render={LogInComponent}/>
              <Route exact path="/debits" render={debitComponent}/>    
              <Route exact path="/credits" render={creditComponent}/>      
          </Router>
        );        
      }
    }
    
    export default App;