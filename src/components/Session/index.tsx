import React from 'react';
import { format } from 'timeago.js';
import SessionHeader from '../SessionHeader';
import { ActionTypes, ISession } from '../../types';
import './styles.scss';

type Props = {
	session: ISession;
	onEdited: (id: number, inputValue: string) => ActionTypes;
	onDeleted: (id: number) => ActionTypes;
};

const Session: React.FC<Props> = ({ session, onEdited, onDeleted }) => {
	const { id, title, time, tabs, tabsNum } = session;

	const openSession = () => {
		tabs.forEach(({ url, pinned }) => {
			chrome.tabs.create({ url, pinned });
		});
	};

	return (
		<div className="session">
			<div className="session__open-btn" onClick={openSession}></div>
			<div className="session__content">
				<SessionHeader id={id} title={title} onEdited={onEdited} onDeleted={onDeleted} />

				<div className="session__footer">
					<div className="session__tabs">{tabsNum} Tabs</div>
					<div className="session__date">{format(time)}</div>
				</div>
			</div>
		</div>
	);
};

export default Session;
