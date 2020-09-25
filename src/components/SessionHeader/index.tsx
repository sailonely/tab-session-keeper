import React, { useState } from 'react';
import { ActionTypes } from '../../types';
import './styles.scss';

type Props = {
	id: number;
	title: string;
	onEdited: (id: number, inputValue: string) => ActionTypes;
	onDeleted: (id: number) => ActionTypes;
};

const SessionHeader: React.FC<Props> = ({ id, title, onEdited, onDeleted }) => {
	const [editMode, setEditMode] = useState(false);
	const [inputValue, setInputValue] = useState(title);

	const handleConfirmation = () => {
		onEdited(id, inputValue);
		setEditMode(false);
	};

	const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setInputValue(e.target.value);
	};

	return !editMode ? (
		<div className="session__header">
			<div className="session__title">
				<span>{title}</span>
			</div>
			<div className="session__control">
				<div className="session__edit-btn" onClick={() => setEditMode(true)}></div>
				<div className="session__delete-btn" onClick={() => onDeleted(id)}></div>
			</div>
		</div>
	) : (
		<div className="session__header">
			<input
				className="session__input"
				type="text"
				autoFocus={true}
				value={inputValue}
				onChange={handleTitleChange}
			/>
			<div className="session__control">
				<div className="session__confirm-btn" onClick={handleConfirmation}></div>
			</div>
		</div>
	);
};

export default SessionHeader;
