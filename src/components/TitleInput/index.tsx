import React from 'react';
import { ActionTypes } from '../../types';
import './styles.scss';

type Props = {
	title: string;
	onChanged: (title: string) => ActionTypes;
};

const TitleInput: React.FC<Props> = ({ title, onChanged }) => {
	return (
		<input
			className="title-input"
			type="text"
			value={title}
			placeholder="Session name..."
			onChange={(e) => onChanged(e.target.value)}
		/>
	);
};

export default TitleInput;
