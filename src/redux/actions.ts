import { ActionTypes } from '../types';
import {
	CHANGE_TITLE,
	ADD_SESSION,
	DELETE_SESSION,
	EDIT_SESSION_TITLE,
} from './reducer';

export const changeTitle = (title: string): ActionTypes => {
	return {
		type: CHANGE_TITLE,
		payload: title,
	};
};

export const addSession = (id: number, tabs: chrome.tabs.Tab[]): ActionTypes => {
	return {
		type: ADD_SESSION,
		payload: { id, tabs },
	};
};

export const deleteSession = (id: number): ActionTypes => {
	return {
		type: DELETE_SESSION,
		payload: id,
	};
};

export const editSessionTitle = (id: number, title: string): ActionTypes => {
	return {
		type: EDIT_SESSION_TITLE,
		payload: { id, title },
	};
};
