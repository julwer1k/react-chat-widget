export const Answer = ({ id, text, selectAnswers }) => {
  return (
    <button className="answer-button" onClick={() => selectAnswers(id)}>
      {text}
    </button>
  )
}
