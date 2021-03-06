import React from 'react';
import {connect} from 'react-redux'
import {
	Body, Card, CardItem, Container, Content, Footer, FooterTab, Header, Right, Switch, Text,
	Title
} from "native-base";
import {askingForRace, enterRace, manualSwitchOff, manualSwitchOn, waitingAvailableRace} from "../actions/index";
import Status from "./Status";
import {api} from "../utils/index";


export const TOKEN = "kdsfbgdksfgbsk";

class Track extends React.Component {

	onSwitchChange(v) {
		if (v) {
			this.props.manualSwitchOn();
			this.askForRace();
		} else {
			this.props.manualSwitchOff();
			this.sendQuit();
		}
	}

	render() {
		return <Container>
			<Header>
				<Body>
				<Title>{this.props.boat.name}</Title>
				</Body>
			</Header>
			<Content>
				<Card>
					<CardItem>
						<Body>
						<Text>
							Transmitir posición
						</Text>
						</Body>
						<Right>
							<Switch value={this.props.switch} onValueChange={(v) => this.onSwitchChange(v)}/>
						</Right>
					</CardItem>
				</Card>
				<Status/>
			</Content>
		</Container>
	}

	askForRace() {
		this.props.askingForRace();

		api("status", {
			"key": this.props.boat.id,
			"token": TOKEN
		}, (responseJson) => {
			if (responseJson.result.meta.code === 600) {
				this.props.waitingAvailableRace();
			} else {
				this.props.enterRace(responseJson.result.data.race);
			}
		});
	}

	sendQuit() {
		api("quit", {
			"token": TOKEN
		});
	}
}

function mapStateToProps(state) {
	return {
		boat: state.boat,
		switch: state.switch
	}
}

const mapDispatchToProps = {
	manualSwitchOn,
	manualSwitchOff,
	askingForRace,
	waitingAvailableRace,
	enterRace,
};

Track = connect(mapStateToProps, mapDispatchToProps)(Track)

export default Track