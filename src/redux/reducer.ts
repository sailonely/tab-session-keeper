import { ActionTypes, IState } from '../types';

export const CHANGE_TITLE = 'CHANGE_TITLE';
export const ADD_SESSION = 'ADD_SESSION';
export const DELETE_SESSION = 'DELETE_SESSION';
export const EDIT_SESSION_TITLE = 'EDIT_SESSION_TITLE';

const initialState: IState = {
	title: '',
	sessions: [],
};

const reducer = (state = initialState, action: ActionTypes) => {
	switch (action.type) {
		case CHANGE_TITLE:
			return { ...state, title: action.payload };

		case ADD_SESSION:
			return addSession(state, action.payload);

		case DELETE_SESSION:
			return deleteSession(state, action.payload);

		case EDIT_SESSION_TITLE:
			return editSessionTitle(state, action.payload);

		default:
			return state;
	}
};

const addSession = (state: IState, payload: { id: number; tabs: chrome.tabs.Tab[] }) => {
	const { id, tabs } = payload;
	const title = state.title || `Unnamed session`;
	const newSession = {
		id,
		tabs,
		title,
		time: id,
		tabsNum: tabs.length,
	};

	return {
		...state,
		title: '',
		sessions: [newSession, ...state.sessions],
	};
};

const deleteSession = (state: IState, id: number) => {
	const sessions = state.sessions.filter((session) => session.id !== id);

	return { ...state, sessions };
};

const editSessionTitle = (state: IState, payload: { id: number; title: string }) => {
	const { sessions } = state;
	const { id, title } = payload;
	const idx = sessions.findIndex((session) => session.id === id);
	const editedSession = { ...sessions[idx], title };

	return {
		...state,
		sessions: [...sessions.slice(0, idx), editedSession, ...sessions.slice(idx + 1)],
	};
};

export default reducer;
