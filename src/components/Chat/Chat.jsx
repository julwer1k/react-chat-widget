import "./Chat.scss";
import { useState } from "react";
import { toggleModal } from "../../utils/toggleModal.js";
import { ChatButton } from "./ui/ChatButton/index.js";
import { ChatModal } from "./ui/ChatModal/index.js";
export const Chat = () => {
	const [isShowModal, setIsShowModal] = useState(false);

	const handleToggleModal = () => toggleModal(isShowModal, setIsShowModal);

	return (
		<div className="widget-wrapper">
			{isShowModal && <ChatModal />}
			<ChatButton handleFunction={handleToggleModal} />
		</div>
	);
};
