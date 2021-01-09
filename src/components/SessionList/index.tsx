import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import Session from '../Session';
import { IState } from '../../types';
import { editSessionTitle, deleteSession } from '../../redux/actions';
import './styles.scss';

type Props = ConnectedProps<typeof connector>;

const SessionList: React.FC<Props> = ({ sessions, onEdited, onDeleted }) => {
	const elements = sessions.map((session) => {
		const { id } = session;

		return (
			<li key={id} className="session-list__item">
				<Session session={session} onEdited={onEdited} onDeleted={onDeleted} />
			</li>
		);
	});

	return <ul className="session-list">{elements}</ul>;
};

const mapState = ({ sessions }: IState) => ({ sessions });
const mapDispatch = {
	onEdited: editSessionTitle,
	onDeleted: deleteSession,
};
const connector = connect(mapState, mapDispatch);

export default connector(SessionList);
