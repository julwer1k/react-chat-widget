import "./ChatModal.scss";
import Scrollbar from "react-scrollbars-custom";
import { Message } from "../../../Message/index.js";

export const ChatModal = () => {
  const imgUrl =
    "https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108";

  return (
    <div className="chat-modal">
      <Scrollbar>
        <nav className="navbar-modal">
          <div className="navbar-modal__container">
            <div className="navbar-modal__content">
              <div className="navbar-modal__arrow-wrapper">
                <button className="navbar-modal__arrow" disabled />
              </div>

              <div className="person">
                <div className="person__avatar person__avatar--nav">
                  <img
                    src={imgUrl}
                    className="navbar-modal__person-avatar person__image"
                    alt="person avatar"
                  />
                </div>

                <p className="person__name">Jayne N.</p>
              </div>
            </div>
          </div>
        </nav>

        <Message />
      </Scrollbar>
    </div>
  );
};
