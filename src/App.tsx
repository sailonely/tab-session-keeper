import { useEffect, useState, useRef } from 'react';
import { HiOutlineEmojiSad } from 'react-icons/hi';

import { TSession, TTab } from './types';
import SaveButton from './components/SaveButton';
import SessionList from './components/SessionList';
import './App.scss';

export default function App() {
  const [title, setTitle] = useState('');
  const [isError, setIsError] = useState(false);
  const { pending, sessions, setSessions } = useSessions(setIsError);

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (isError) {
      timerId = setTimeout(() => setIsError(false), 3000);
    }
    return () => clearTimeout(timerId);
  }, [isError]);

  const handleAddSession = (timestamp: number, tabs: TTab[]) => {
    const newSession = {
      id: timestamp,
      tabs,
      title: title || 'Unnamed session',
      timestamp,
    };

    setTitle('');
    setSessions((s) => [newSession, ...s]);
  };

  let mainContent;
  if (pending) {
    mainContent = null;
  } else if (sessions.length === 0) {
    mainContent = <span className="main__no-items-text"> No sessions</span>;
  } else {
    mainContent = (
      <SessionList
        sessions={sessions}
        setSessions={setSessions}
        setIsError={setIsError}
      />
    );
  }

  return (
    <div className="app">
      <div className="header">
        <input
          className="title-input"
          value={title}
          placeholder="Session name..."
          onChange={(e) => setTitle(e.target.value)}
        />
        <SaveButton onAddSession={handleAddSession} setIsError={setIsError} />
      </div>

      <div className="main">{mainContent}</div>

      <div className={`error${isError ? ' error--visible' : ''}`}>
        <HiOutlineEmojiSad size={40} className="error__icon" />{' '}
        <span className="error__text">Oops, something went wrong</span>
      </div>
    </div>
  );
}

const useSessions = (setIsError: (value: boolean) => void) => {
  const [pending, setPending] = useState(true);
  const [sessions, setSessions] = useState<TSession[]>([]);
  const didMountRef = useRef(false);

  useEffect(() => {
    chrome.storage.local
      .get('sessions')
      .then(({ sessions = [] }) => setSessions(sessions))
      .catch(() => setIsError(true))
      .finally(() => setPending(false));
  }, []);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }
    chrome.storage.local.set({ sessions }).catch(() => {
      setIsError(true);
    });
  }, [sessions]);

  return { pending, sessions, setSessions };
};
