import React, { Component } from 'react';
import styles from './app.module.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppContext } from './services/AppContext';
import ReloadPrompt from './ReloadPrompt';

import Home from './pages/home';
import {SignIn, SignUp} from './pages/auth';

export class App extends Component {
	state = {};
	componentDidMount() {
		
	}

	render() {
		return (
			<AppContext.Provider
				value={{
				}}
			>
				<main className={styles['app']}>
					<Router>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route exact path="/signup" component={SignUp} />
							<Route exact path="/signin" component={SignIn} />
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
