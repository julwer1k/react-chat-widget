import './Message.scss'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const FIRST_MESSAGE = 'first-message'
const DEFAULT_MESSAGE = 'default-message'
const TYPING_MESSAGE = 'type-message'

const SUPPORT = 'support'
const USER = 'user'

export const Message = ({ content }) => {
  if (content) {
    const { person = 'Arthur', type = DEFAULT_MESSAGE } = content
    const { role, name, time, message = [], imgUrl } = person

    return (<section
      className={classNames('message', {
        'message--first': type === FIRST_MESSAGE,
      })}
    >
      <p
        className={classNames('message__name', {
          'message__name--support': role === SUPPORT, 'message__name--user': role === USER,
        })}
      >
        {name}
      </p>

      <div
        className={classNames('person__avatar message__avatar', {
          'message__avatar--support': role === SUPPORT, 'message__avatar--user': role === USER,
        })}
      >
        <img
          src={imgUrl}
          className="person__image message__avatar-image"
          alt="person avatar"
        ></img>
      </div>

      {message.map((msg) => {
        const { id, text } = msg

        return (<p
          key={id}
          className={classNames('message__text', {
            'message__text--support': role === SUPPORT, 'message__text--user': role === USER,
          })}
        >
          {text}
        </p>)
      })}

      <p className="message__time">{time}</p>

      {type === TYPING_MESSAGE && (<div
        className={classNames('message__text message__dots-box', {
          'message__text--support': role === SUPPORT, 'message__text--user': role === USER,
        })}
      >
        <span className="message__dots"></span>
      </div>)}
    </section>)
  }
}

Message.propTypes = {
  content: PropTypes.shape({
    person: PropTypes.shape({
      role: PropTypes.string,
      name: PropTypes.string,
      imgUrl: PropTypes.string,
      message: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number, text: PropTypes.string,
      })),
      time: PropTypes.string,
    }), type: PropTypes.string,
  }),
}
