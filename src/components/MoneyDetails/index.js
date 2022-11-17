const MoneyDetails = props => {
  const {balance, income, expenses} = props
  return (
    <div className="money-flex">
      <div className="card1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
          alt="balance"
          className="image1"
        />
        <div className="text1">
          <p className="parad">Your Balance</p>
          <p testid="balanceAmount" className="spand parad">
            Rs {balance}
          </p>
        </div>
      </div>
      <div className="card2">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
          alt="income"
          className="image1"
        />
        <div className="text1">
          <p className="parad">Your Income</p>
          <p testid="incomeAmount" className="spand parad">
            Rs {income}
          </p>
        </div>
      </div>
      <div className="card3">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
          alt="expenses"
          className="image1"
        />
        <div className="text1">
          <p className="parad">Your Expenses</p>
          <p testid="expensesAmount" className="spand parad">
            Rs {expenses}
          </p>
        </div>
      </div>
    </div>
  )
}

export default MoneyDetails
