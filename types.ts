export interface DocFile {
  id: string;
  name: string;
  content: string;
  lastModified: number;
}

export interface NavItem {
  title: string;
  fileName: string; // Used to link back to DocFile.name
}

export interface NavCategory {
  categoryName: string;
  items: NavItem[];
}

export interface SiteStructure {
  siteTitle: string;
  siteDescription: string;
  navigation: NavCategory[];
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  VIEWING = 'VIEWING',
  ERROR = 'ERROR'
}
