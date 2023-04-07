import { useState, memo } from 'react';
import { TiArrowBack } from 'react-icons/ti';
import { FiExternalLink } from 'react-icons/fi';

import { TSession } from '../types';
import { formatDate } from '../utils/formatDate';
import SessionHeader from './SessionHeader';

enum EMenu {
  MT = 'Merge tabs',
  NW = 'New window',
  CW = 'Current window',
}

interface IProps {
  session: TSession;
  setSessions: React.Dispatch<React.SetStateAction<TSession[]>>;
  setIsError: (value: boolean) => void;
}

export default memo(function Session({
  session: { id, title, timestamp, tabs: savedTabs },
  setSessions,
  setIsError,
}: IProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMenuBtnClick = async (mode: EMenu) => {
    try {
      if (mode === EMenu.MT) {
        const currTabs = await chrome.tabs.query({ currentWindow: true });

        savedTabs.forEach(({ url, pinned }) => {
          const isAlreadyExists = currTabs.some(
            (currTab) => currTab.pinned === pinned && currTab.url === url
          );

          if (!isAlreadyExists) {
            chrome.tabs.create({ url, pinned });
          }
        });
      } else if (mode === EMenu.NW) {
        const { id: windowId, tabs } = await chrome.windows.create({
          top: 150,
          height: 720,
        });

        savedTabs.forEach(({ url, pinned }) =>
          chrome.tabs.create({ url, pinned, windowId })
        );

        const newEmptyTab = tabs?.[0];
        if (newEmptyTab?.id) {
          chrome.tabs.remove(newEmptyTab.id);
        }
      } else {
        savedTabs.forEach(({ url, pinned }) => chrome.tabs.create({ url, pinned }));
      }
    } catch {
      setIsError(true);
    }
  };

  return (
    <div
      className="session"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className={`session__open-btn${
          isHovered || isMenuOpen ? '' : ' session__open-btn--hidden'
        }`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        {isMenuOpen ? <TiArrowBack size={28} /> : <FiExternalLink size={26} />}
      </button>

      {isMenuOpen ? (
        <div className="session__mode-menu">
          {[EMenu.MT, EMenu.NW, EMenu.CW].map((mode, index) => (
            <button
              key={index}
              className="session__mode-menu-btn"
              onClick={() => handleMenuBtnClick(mode)}
            >
              {mode}
            </button>
          ))}
        </div>
      ) : (
        <div className="session__content">
          <SessionHeader id={id} title={title} setSessions={setSessions} />

          <div className="session__footer">
            <div className="session__tabs">{savedTabs.length} Tabs</div>
            <div className="session__date">{formatDate(timestamp)}</div>
          </div>
        </div>
      )}
    </div>
  );
});
