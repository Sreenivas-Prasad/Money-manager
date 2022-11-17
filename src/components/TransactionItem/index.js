import './index.css'

const TransactionItem = props => {
  const {historyList, getId} = props
  const {title, amount, type, id} = historyList

  const giveId = () => {
    getId(id)
  }

  return (
    <div>
      <li className="item-bg">
        <p className="para4">{title}</p>
        <p className="para4">{amount}</p>
        <p className="para4">{type}</p>
        <button
          type="button"
          className="button2"
          testid="delete"
          onClick={giveId}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png"
            alt="delete"
            className="delete-img"
          />
        </button>
      </li>
      <hr />
    </div>
  )
}

export default TransactionItem
