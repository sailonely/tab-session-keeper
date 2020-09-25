import React from 'react';
import { ActionTypes } from '../../types';
import './styles.scss';

type Props = {
	onAdded: (id: number, tabs: chrome.tabs.Tab[]) => ActionTypes;
};

const SaveButton: React.FC<Props> = ({ onAdded }) => {
	const handleClick = () => {
		chrome.tabs.query({ currentWindow: true }, (tabs) => {
			const id = Date.now();

			onAdded(id, tabs);
		});
	};

	return (
		<button className="save-btn" onClick={handleClick}>
			SAVE
		</button>
	);
};

export default SaveButton;
