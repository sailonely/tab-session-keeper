import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import TitleInput from '../TitleInput';
import SaveButton from '../SaveButton';
import SessionList from '../SessionList';
import { IState } from '../../types';
import { addSession, changeTitle } from '../../redux/actions';
import './styles.scss';

type Props = ConnectedProps<typeof connector>;

const App = ({ title, onAdded, onChanged }: Props) => {
	return (
		<div className="app">
			<div className="header">
				<TitleInput title={title} onChanged={onChanged} />
				<SaveButton onAdded={onAdded} />
			</div>

			<div className="body">
				<SessionList />
			</div>
		</div>
	);
};

const mapState = ({ title }: IState) => ({ title });
const mapDispatch = {
	onAdded: addSession,
	onChanged: changeTitle,
};
const connector = connect(mapState, mapDispatch);

export default connector(App);
