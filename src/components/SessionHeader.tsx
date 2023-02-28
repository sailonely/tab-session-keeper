import { useState } from 'react';
import { FaPen } from 'react-icons/fa';
import { CgClose } from 'react-icons/cg';
import { BsCheckLg } from 'react-icons/bs';

import { TSession } from '../types';

interface IProps {
  id: number;
  title: string;
  setSessions: React.Dispatch<React.SetStateAction<TSession[]>>;
}

export default function SessionHeader({ id, title, setSessions }: IProps) {
  const [editMode, setEditMode] = useState(false);
  const [inputValue, setInputValue] = useState(title);

  const handleTitleUpdate = () => {
    setEditMode(false);
    setSessions((sessions) =>
      sessions.map((s) => (s.id !== id ? s : { ...s, title: inputValue }))
    );
  };

  const handleDelete = (id: number) => {
    setSessions((s) => s.filter((session) => session.id !== id));
  };

  if (editMode) {
    return (
      <div className="session__header">
        <input
          className="session__input"
          autoFocus={true}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <div className="session__control session__control--visible">
          <button className="session__control-btn" onClick={handleTitleUpdate}>
            <BsCheckLg size={13} />
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="session__header">
        <div className="session__title">
          <span>{title}</span>
        </div>
        <div className="session__control">
          <button className="session__control-btn" onClick={() => setEditMode(true)}>
            <FaPen size={11} />
          </button>
          <button className="session__control-btn" onClick={() => handleDelete(id)}>
            <CgClose size={70} />
          </button>
        </div>
      </div>
    );
  }
}
