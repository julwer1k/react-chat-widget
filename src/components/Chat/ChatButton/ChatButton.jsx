import './ChatButton.scss'

import PropTypes from 'prop-types'

export const ChatButton = ({ isShowModal, setIsShowModal }) => {
	const toggleChatModal = () => {
		setIsShowModal(!isShowModal);
	};

	return (
		<button
			className="chat-button"
			aria-label="Open live chat"
			onClick={toggleChatModal}
		>
			<svg className="chat-button__icon" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
				<rect fill="none" height="256" width="256" />
			</svg>
		</button>
	);
}

ChatButton.propTypes = {
	isShowModal: PropTypes.bool.isRequired,
	setIsShowModal: PropTypes.func.isRequired,
};

