import { TSession } from '../types';
import Session from './Session';

interface IProps {
  sessions: TSession[];
  setSessions: React.Dispatch<React.SetStateAction<TSession[]>>;
  setIsError: (value: boolean) => void;
}

export default function SessionList({ sessions, setSessions, setIsError }: IProps) {
  return (
    <ul className="session-list">
      {sessions.map((session) => (
        <li key={session.id} className="session-list__item">
          <Session session={session} setSessions={setSessions} setIsError={setIsError} />
        </li>
      ))}
    </ul>
  );
}
