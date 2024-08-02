import './App.scss'
import { Chat } from '../components/Chat/index.js'

export const App = () => {

	return (
		<div className="app">
			<Chat />

			<header className="app__header">
				<h1 className="app__title">Welcome to My Web Page</h1>
				<nav className="app__nav">
					<ul className="app__nav-list">
						<li><a href="#about">About</a></li>
						<li><a href="#services">Services</a></li>
						<li><a href="#contact">Contact</a></li>
					</ul>
				</nav>
			</header>

			<main className="app__content">
				<section id="about" className="about">
					<h2 className="about__title">About Us</h2>
					<p className="about__text">We are a web development company that...</p>
				</section>
				<section id="services" className="services">
					<h2 className="services__title">Our Services</h2>
					<ul className="services__list">
						<li>Web Design</li>
						<li>Web Development</li>
						<li>Search Engine Optimization</li>
					</ul>
				</section>
			</main>

			<footer className="app__footer">
				<p>&copy; 2021 My Web Page. All rights reserved.</p>
				<address>
					123 Main Street, Anytown, USA<br />
					Phone: (123) 456-7890<br />
					Email: info@mywebpage.com
				</address>
			</footer>
		</div>
	)
}

