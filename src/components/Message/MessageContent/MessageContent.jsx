import './MessageContent.scss'
import { useEffect, useMemo, useState } from 'react'
import { Loader } from '../../Loader/Loader.jsx'
import { Message } from '../Message/index.js'

const answers = [
	{ id: 0, text: 'Який сьогодні день?' },
	{ id: 1, text: 'Яка зараз година?' },
	{ id: 2, text: 'Скільки днів до Нового Року?' },
	{ id: 3, text: 'Своє питання' },
]

const initialState = {
	key: 0,
	person: {
		role: 'support',
		name: 'Jayne N',
		imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
		message: [{ id: 0, text: 'Чим я вам можу допомогти?' }],
		time: new Date().toISOString(),
	},
	type: 'first-message',
}

export const MessageContent = () => {
	const [inputValue, setInputValue] = useState('')
	const [selectAnswer, setSelectAnswer] = useState(null)
	const [initialMessage, setInitialMessage] = useState(null)
	const [isLoading, setIsLoading] = useState(true)
	const [messages, setMessages] = useState([])
	const [messageId, setMessageId] = useState(0)

	const isWriteQuestion = useMemo(() => selectAnswer === 3, [selectAnswer])

	useEffect(
		() => {
			if (inputValue.trim()) {
				const typingMessage = {
					person: {
						role: 'user',
						name: 'Jayne N',
						imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
						message: [],
					},
					type: 'type-message',
				}

				if (!messages.some(message => message.type === 'type-message')) {
					setMessages(prev => [...prev, typingMessage])
				}
			} else {
				setMessages(prev => prev.filter(message => message.type !== 'type-message'))
			}
		},
		[inputValue],
	)

	const selectAnswers = (answerId) => {

		const now = new Date()
		let newMessage

		switch (answerId) {
			case 0: {
				const daysOfWeek = ['Неділя', 'Понеділок', 'Вівторок', 'Середа', 'Четвер', 'П\'ятниця', 'Субота']
				const dayOfWeek = daysOfWeek[now.getDay()]

				newMessage = {
					key: messageId,
					person: {
						role: 'support',
						name: 'Jayne N',
						imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
						message: [{ id: messageId, text: `Сьогодні ${dayOfWeek}` }],
					},
					type: 'default-message',
				}
				break
			}

			case 1: {
				const currentTime = now.toLocaleTimeString()

				newMessage = {
					key: messageId,
					person: {
						role: 'support',
						name: 'Jayne N',
						imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
						message: [{ id: messageId, text: `Зараз ${currentTime}` }],
					},
					type: 'default-message',
				}
				break
			}

			case 2: {
				const newYear = new Date(now.getFullYear() + 1, 0, 1)
				const daysUntilNewYear = Math.ceil((newYear - now) / (1000 * 60 * 60 * 24))

				newMessage = {
					key: messageId,
					person: {
						role: 'support',
						name: 'Jayne N',
						imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
						message: [{ id: messageId, text: `До Нового Року залишилося ${daysUntilNewYear} днів` }],
					},
					type: 'default-message',
				}
				break
			}

			default:
				break
		}

		if (answerId !== 3) {
			console.log(selectAnswer)
			const typingMessage = {
				person: {
					role: 'support',
					name: 'Jayne N',
					imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
					message: [],
				},
				type: 'type-message',
			}

			setMessages(prev => [...prev, typingMessage])

			setTimeout(() => {
				setMessages(prev => {
					prev.pop()
					return [...prev, newMessage]
				})
			}, 400)
		} else {
			setMessages([])
			setMessageId(prev => prev + 1)
		}

		setSelectAnswer(answerId)
	}

	const handeChangeInput = (event) => {
		const value = event.target.value
		setInputValue(value)
	}

	useEffect(() => {
		const fetchMessage = () => {
			setTimeout(() => {
				setInitialMessage(initialState)
				setIsLoading(false)
			}, 200)
		}

		fetchMessage()
	}, [])

	const submitInputValue = (event) => {
		event.preventDefault();

		const userInput = inputValue.trim();
		if (userInput) {
			fetch('/api/messages', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ message: userInput }),
			})
				.then(() => {
					console.log('Message sent!');
				})
				.catch((error) => {
					console.error('Error sending message:', error);
				});
		}

		const newMessage = {
			person: {
				role: 'user',
				name: 'Arthur',
				imgUrl: null,
				message: [{ id: messageId + 1, text: inputValue }],
			},
			type: 'default-message',
		};

		const answerMessage = {
			person: {
				role: 'support',
				name: 'Jayne N',
				imgUrl: 'https://6939709.fs1.hubspotusercontent-na1.net/hub/6939709/hubfs/Screenshot%202022-05-16%20at%2008.57.55-modified.png?width=108&height=108',
				message: [{ id: messageId + 3, text: 'Дякую за вашу відповідь!' }],
			},
			type: 'default-message',
		};

		setMessages((prev) => [...prev, newMessage]);

		setTimeout(() => {
			setMessages(prev => [...prev, answerMessage])
		}, 400);

		setInputValue('');
	};

	return (
		<>
			<div className="message-content message-content__container">
				{isLoading ? (
					<Loader />
				) : (
					<>
						<Message content={initialMessage} />

						{selectAnswer === null && (
							<div className="answers-content">
								{answers.map(({ id, text }) => (
									<button
										key={id}
										className="answer-button"
										onClick={() => selectAnswers(id)}
									>
										{text}
									</button>
								))}
							</div>
						)}

						{messages.map((message, index) => {
							if (message) {
								return (
									<Message key={index} content={message} />
								)
							}
						})}
					</>
				)}
			</div>

			{isWriteQuestion && (
				<form className="message-field" onSubmit={submitInputValue}>
					<input
						value={inputValue}
						onChange={handeChangeInput}
						type="text"
						className="message-field__text"
						placeholder="Write a message"
					/>

					<button
						type="submit"
						className="message-field__button"
						disabled={!inputValue.trim()}
					>
						<svg
							className="feather feather-send message-field__button-icon"
							fill="none"
							height="24"
							stroke="currentColor"
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth="2"
							viewBox="0 0 24 24"
							width="24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<line x1="22" x2="11" y1="2" y2="13" />
							<polygon points="22 2 15 22 11 13 2 9 22 2" />
						</svg>
					</button>
				</form>
			)}
		</>
	)
}
