import React, { Component } from 'react';
import styles from './app.module.css';
import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import { AppContext } from './services/AppContext';
import ReloadPrompt from './ReloadPrompt';

import Home from './pages/home';
import Rooms, { SelectedRoom } from './pages/rooms';
import Music, { SelectedSong } from './pages/music';
import Meditations, { SelectedMeditation } from './pages/mediations';
import Settings from './pages/settings';

import { SignIn, SignUp } from './pages/auth';
import { Api } from './services/Api';
const host = 'https://halcyon-next.vercel.app/api';

export class App extends Component {
	state = {
		api: new Api(host),
	};

	componentDidMount() {
		const { api } = this.state;
		if (localStorage.getItem('token')) {
			api.setToken(localStorage.getItem('token'));
			this.getMe(api)
				.then((me) => {
					this.setState({ me });
				})
				.catch(console.error);
		}
	}

	validateToken = () => {
		if (!localStorage.getItem('token')) {
			window.location = '/signin';
		}
	};

	getMe = async (api) => {
		return await api.getMe();
	};

	render() {
		const { api, me } = this.state;
		return (
			<AppContext.Provider
				value={{
					api,
					me,
					validateToken: this.validateToken,
					isAuthenticated: localStorage.getItem('token'),
				}}
			>
				<main className={styles['app']}>
					<Router>
						<Switch>
							<Route exact path="/rooms" component={Rooms} />
							<Route
								exact
								path="/rooms/:id"
								component={SelectedRoom}
							/>
							<Route exact path="/music" component={Music} />
							<Route
								exact
								path="/music/:id"
								component={SelectedSong}
							/>
							<Route
								exact
								path="/meditations"
								component={Meditations}
							/>
							<Route
								exact
								path="/meditations/:id"
								component={SelectedMeditation}
							/>
							<Route
								exact
								path="/settings"
								component={Settings}
							/>
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/signin" component={SignIn} />
							<Route exact path="/" component={Home} />
							<Redirect to="/" />
						</Switch>
					</Router>
				</main>
				<ReloadPrompt />
			</AppContext.Provider>
		);
	}
}

function uniqueArticles(articles) {
	const articleMap = {};
	let articleOrder = [];
	const response = [];
	for (let article of articles) {
		articleMap[`${article.id}`] = article;
		articleOrder.push(article.id);
	}

	articleOrder = [...new Set(articleOrder)];
	for (let id of articleOrder) {
		response.push(articleMap[id]);
	}

	return response.filter((r) => !!r);
}
