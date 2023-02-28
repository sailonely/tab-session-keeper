import { TTab } from '../types';

interface IProps {
  setIsError: (value: boolean) => void;
  onAddSession: (timestamp: number, tabs: TTab[]) => void;
}

export default function SaveButton({ onAddSession, setIsError }: IProps) {
  const handleClick = async () => {
    try {
      const queriedTabs = await chrome.tabs.query({ currentWindow: true });
      const tabs = queriedTabs.map(({ index, pinned, url }) => ({
        index,
        pinned,
        url,
      }));
      onAddSession(Date.now(), tabs);
    } catch {
      setIsError(true);
    }
  };

  return (
    <button className="save-btn" onClick={handleClick}>
      SAVE
    </button>
  );
}
