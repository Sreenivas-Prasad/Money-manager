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
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
    historyList: [],
  }

  updateTitle = event => {
    this.setState({title: event.target.value})
  }

  updateAmount = event => {
    this.setState({amount: event.target.value})
  }

  optionValue = event => {
    this.setState({optionId: event.target.value})
  }

  submitValue = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state

    const forType = transactionTypeOptions.find(
      each6 => each6.optionId === optionId,
    )
    const {displayText} = forType

    const newList = {
      title,
      amount,
      type: displayText,
      id: uuidv4(),
    }

    this.setState(prev => ({
      historyList: [...prev.historyList, newList],
      amount: '',
      title: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getId = id => {
    const {historyList} = this.state
    const filteredList = historyList.filter(each2 => each2.id !== id)
    this.setState({historyList: filteredList})
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expenses = 0
    historyList.forEach(each4 => {
      if (transactionTypeOptions[1].displayText === each4.type) {
        expenses += parseInt(each4.amount)
      }
    })
    return expenses
  }

  getIncome = () => {
    const {historyList} = this.state
    let income = 0
    historyList.forEach(each3 => {
      if (transactionTypeOptions[0].displayText === each3.type) {
        income += parseInt(each3.amount)
      }
    })
    return income
  }

  getBalance = () => {
    const {historyList} = this.state
    let balance = 0
    let income = 0
    let expenses = 0
    historyList.forEach(each5 => {
      if (each5.type === transactionTypeOptions[0].displayText) {
        income += parseInt(each5.amount)
      } else {
        expenses += parseInt(each5.amount)
      }
    })
    balance = income - expenses

    return balance
  }

  render() {
    const {historyList, title, amount, optionId} = this.state

    const income = this.getIncome()
    const expenses = this.getExpenses()
    const balance = this.getBalance()

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
                value={optionId}
              >
                {transactionTypeOptions.map(eachItem => (
                  <option value={eachItem.optionId} key={eachItem.optionId}>
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
            <li className="history-con">
              <p className="para3">Title</p>
              <p className="para3">Amount</p>
              <p className="para3">Type</p>
            </li>
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
