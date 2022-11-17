import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'
import TransactionItem from '../TransactionItem'
import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    balance: 0,
    income: 0,
    expenses: 0,
    title: '',
    amount: '',
    type: transactionTypeOptions[0].displayText,
    historyList: [],
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  optionValue = event => {
    this.setState({type: event.target.value})
  }

  submitValue = event => {
    event.preventDefault()
    const {title, amount, type, historyList} = this.state
    let {balance, income, expenses} = this.state

    const newList = {
      title,
      amount,
      type,
      id: uuidv4(),
    }

    if (type === 'Income') {
      income = parseInt(amount) + income
      balance += parseInt(amount)
    } else {
      expenses = parseInt(amount) + expenses
      balance -= parseInt(amount)
    }

    this.setState({
      historyList: [...historyList, newList],
      expenses,
      income,
      balance,
      amount: '',
      title: '',
    })
  }

  getId = id => {
    const {historyList} = this.state
    let {income, balance, expenses} = this.state
    const filteredList = historyList.filter(each2 => each2.id !== id)
    const updateMoney = historyList.filter(each3 => each3.id === id)
    if (updateMoney[0].type === 'Income') {
      income -= parseInt(updateMoney[0].amount)
      balance -= parseInt(updateMoney[0].amount)
    } else {
      expenses -= parseInt(updateMoney[0].amount)
      balance += parseInt(updateMoney[0].amount)
    }
    this.setState({historyList: filteredList, income, balance, expenses})
  }

  render() {
    const {
      balance,
      income,
      expenses,
      historyList,
      title,
      amount,
      type,
    } = this.state
    return (
      <div className="money-bg">
        <div className="head-card">
          <div className="text">
            <h1 className="heading">Hi, Govinda</h1>
            <p className="para">
              Welcome back to your <span className="spann">Money Manager</span>{' '}
            </p>
          </div>
        </div>
        <MoneyDetails balance={balance} income={income} expenses={expenses} />
        <div className="footer-cards">
          <div className="add-t">
            <h2 className="para2">Add Transaction</h2>
            <form className="formm" onSubmit={this.submitValue}>
              <label htmlFor="title" className="label">
                TITLE
              </label>
              <input
                id="title"
                className="inputt"
                placeholder="TITLE"
                value={title}
                onChange={this.updateTitle}
              />
              <label htmlFor="amount" className="label">
                AMOUNT
              </label>
              <input
                id="amount"
                value={amount}
                className="inputt"
                placeholder="AMOUNT"
                onChange={this.updateAmount}
              />
              <label htmlFor="type" className="label">
                TYPE
              </label>
              <select
                className="inputt"
                onChange={this.optionValue}
                value={type}
              >
                {transactionTypeOptions.map(eachItem => (
                  <option value={eachItem.displayText} key={eachItem.optionId}>
                    {eachItem.displayText}
                  </option>
                ))}
              </select>
              <button type="submit" className="button1">
                Add
              </button>
            </form>
          </div>
          <div className="add-t">
            <h2 className="para2">History</h2>
            <div className="history-con">
              <p className="para3">Title</p>
              <p className="para3">Amount</p>
              <p className="para3">Type</p>
            </div>
            <ul className="history-con2">
              {historyList.map(each1 => (
                <TransactionItem
                  historyList={each1}
                  key={each1.id}
                  getId={this.getId}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
