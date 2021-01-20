import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class Debit extends Component {    
    constructor(){
        super();
        this.state = {
            description: "",
            amount: 0,
        }
        this.addDescription = this.addDescription.bind(this);
        this.addAmount = this.addAmount.bind(this);
        this.saveContent = this.saveContent.bind(this);

    }
 
  addDescription(e){
    let input = e.target.value
    this.setState({description : input})
  }  

  addAmount(e){
      console.log(e.target.value)
    this.setState({amount : e.target.value}) 
  }

  saveContent(){
      var today = new Date(),

    date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate()+"T" 
    + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
      let obj ={
          description: this.state.description,
          amount:this.state.amount,
          date: date,
          id: "799b163d-c33b-4608-a85c-5b7e42a9eb9f",
      }

      this.props.updateBalance(obj)
  }
  render() {  
    return (
        <div>
          <h1>Debits</h1>
          <Link to="/">Home</Link>  
          <div>Account Balance: {this.props.totalAccountBalance}</div>
          <br/>
          <div>
              <label>Description  </label>
              <input onChange={this.addDescription}/>
              <label>  Amount  </label>
              <input onChange={this.addAmount}/>
              <button onClick={this.saveContent}>Save</button>
          </div>
          <table>
            <thead>
                <tr>
                <th>#</th>
                <th>Description</th>
                <th>Amount</th>
                <th>Date</th>
                </tr>
            </thead>
            <tbody>                
                {this.props.data.map((data,index) =>{
                    return( 
                    <tr key={data.id}>
                        <td>{index +1}</td>
                        <td>{data.description}</td>
                        <td>{data.amount}</td>
                        <td>{data.date}</td>
                    </tr>
                    )
                })}               
            </tbody>
          </table> 
        </div>
    );
  }
}

export default Debit;