import './ChatWidget.scss';
import { useState } from 'react'
import { ChatButton } from '../ChatButton/index.js'
import { ChatModal } from '../ChatModal/index.js'

export const ChatWidget = () => {
	const [isShowModal, setIsShowModal] = useState(false)

	return (
		<div className="widget-wrapper">
			{isShowModal && <ChatModal />}
			<ChatButton isShowModal={isShowModal} setIsShowModal={setIsShowModal} />

		</div>
	);
};

