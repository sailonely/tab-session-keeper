export type TSession = {
  id: number;
  tabs: TTab[];
  title: string;
  timestamp: number;
};

export type TTab = Pick<chrome.tabs.Tab, 'url' | 'index' | 'pinned'>;
