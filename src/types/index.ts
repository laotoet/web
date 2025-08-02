// Game types for 2048
export interface GameState {
  board: number[][];
  score: number;
  isGameOver: boolean;
  isWon: boolean;
}

export interface Position {
  row: number;
  col: number;
}

// Navigation types
export interface NavItem {
  label: string;
  href?: string;
  children?: NavItem[];
}

// API types
export interface ApiEndpoint {
  id: string;
  name: string;
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  description?: string;
}

export interface ApiResponse {
  success: boolean;
  data?: unknown;
  error?: string;
  statusCode?: number;
}

// FBAIO specific types
export interface FBAIOUser {
  uid?: string;
  id?: string;
  name?: string;
  full_name?: string;
  avatar?: string | { uri?: string; url?: string };
  avatar_url?: string;
  profile_pic?: string;
  url?: string;
}

export interface FBAIOMediaItem {
  id?: string;
  url?: string;
  type?: string;
  width?: number;
  height?: number;
  thumbnail?: string;
}

export interface FBAIOPost {
  id?: string;
  url?: string;
  text?: string;
  timestamp?: number;
  author?: FBAIOUser;
  media?: FBAIOMediaItem[];
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

// Form types
export interface LoginForm {
  username: string;
  password: string;
}

// Component props
export interface DropdownProps {
  items: NavItem[];
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary' | 'danger';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

// Media Modal types
export interface MediaModalState {
  isOpen: boolean;
  url: string;
  type: 'image' | 'video';
  zoom: number;
  rotation: number;
}
