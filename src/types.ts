import { CHANGE_TITLE, ADD_SESSION, DELETE_SESSION, EDIT_SESSION_TITLE } from './constants';

// Store
export interface IState {
	title: string;
	sessions: ISession[];
}

export interface ISession {
	id: number;
	tabs: chrome.tabs.Tab[];
	title: string;
	time: number;
	tabsNum: number;
}

//Actions
interface IChangeTitle {
	type: typeof CHANGE_TITLE;
	payload: string;
}

interface IAddSession {
	type: typeof ADD_SESSION;
	payload: {
		id: number;
		tabs: chrome.tabs.Tab[];
	};
}

interface IDeleteSession {
	type: typeof DELETE_SESSION;
	payload: number;
}

interface IEditSessionTitle {
	type: typeof EDIT_SESSION_TITLE;
	payload: {
		id: number;
		title: string;
	};
}

export type ActionTypes = IChangeTitle | IAddSession | IDeleteSession | IEditSessionTitle;
