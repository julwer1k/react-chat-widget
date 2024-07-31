import './ChatModal.scss'
import { MessageContent } from '../../Message/MessageContent/index.js'

export const ChatModal = () => {

	return (
		<div className="chat-modal">
			<nav className="navbar-modal">
				<div className="navbar-modal__container">
					<div className="navbar-modal__content">
						<div className="navbar-modal__arrow-wrapper">
							<button className="navbar-modal__arrow"></button>
						</div>

						<div className="person">
							<div className="person__avatar person__avatar--nav">
								<img
									src="https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108"
									className="navbar-modal__person-avatar person__image"
									alt="person avatar"
								></img>
							</div>

							<p className="person__name">Jayne N.</p>
						</div>
					</div>
				</div>
			</nav>

			<MessageContent />

		</div>
	)
}

