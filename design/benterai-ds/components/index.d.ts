/* BenterAI component props — documentation for consumers (window.BenterAI). */
import type { ReactNode } from 'react';

export type IconName = 'plus' | 'search' | 'chat' | 'book' | 'file-plus' | 'building' | 'settings' | 'arrow-up' | 'stop' | 'paperclip' | 'globe' | 'image' | 'library' | 'pin' | 'more' | 'trash' | 'download' | 'upload' | 'users' | 'user-plus' | 'share' | 'check' | 'x' | 'alert' | 'info' | 'check-circle' | 'x-circle' | 'clock' | 'chevron-down' | 'chevron-right' | 'chevron-left' | 'user' | 'logout' | 'menu' | 'sun' | 'moon' | 'lock' | 'copy' | 'refresh' | 'edit' | 'file' | 'file-text' | 'history' | 'eye' | 'key' | 'shield' | 'chart' | 'filter' | 'external' | 'spark' | 'mail' | 'type' | 'palette' | 'sliders' | 'archive' | 'gauge' | 'grid' | 'code' | 'star' | 'sparkles';
export type Status = 'pending' | 'processing' | 'ready' | 'failed' | 'active' | 'pending-account' | 'suspended' | 'uploading' | 'reading';
export type Tone = 'info' | 'success' | 'warning' | 'danger';

export interface IconProps { name: IconName; size?: number; strokeWidth?: number; title?: string; className?: string }
export interface LogoProps { variant?: 'wordmark' | 'full' | 'spark'; theme?: 'light' | 'dark'; height?: number }
export interface ButtonProps { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-ghost'; size?: 'sm' | 'md' | 'lg'; icon?: IconName; iconRight?: IconName; loading?: boolean; disabled?: boolean; block?: boolean; onClick?: () => void; children?: ReactNode }
export interface IconButtonProps { icon: IconName; label: string; variant?: 'outline' | 'primary' | 'stop'; size?: 'sm' | 'md' | 'lg'; active?: boolean; disabled?: boolean; onClick?: () => void }
export interface StatusBadgeProps { status: Status; progress?: number; tone?: Tone | 'neutral'; children?: ReactNode }
export interface ProgressBarProps { value?: number; indeterminate?: boolean; tone?: 'success' | 'warning' | 'danger'; label?: string }
export interface SkeletonProps { w?: number | string; h?: number; r?: number; lines?: number }
export interface FieldProps { label?: ReactNode; hint?: ReactNode; error?: ReactNode; required?: boolean; children: ReactNode }
export interface TextInputProps { icon?: IconName; size?: 'sm' | 'md'; invalid?: boolean; type?: string; value?: string; placeholder?: string; disabled?: boolean; onChange?: (e: any) => void }
export interface SelectProps { options: (string | { value: string; label: string; disabled?: boolean })[]; size?: 'sm' | 'md'; value?: string; defaultValue?: string; wrapStyle?: object; onChange?: (e: any) => void }
export interface CheckboxProps { checked: boolean; label?: ReactNode; description?: ReactNode; disabled?: boolean; onChange?: (checked: boolean) => void }
export interface SwitchProps { checked: boolean; label?: ReactNode; description?: ReactNode; disabled?: boolean; onChange?: (checked: boolean) => void }
export interface SegmentedProps { options: { value: string; label: ReactNode; icon?: IconName; disabled?: boolean }[]; value: string; size?: 'sm' | 'md'; block?: boolean; onChange?: (v: string) => void }
export interface TabsProps { items: { value: string; label: ReactNode; icon?: IconName; count?: number; disabled?: boolean; title?: string }[]; value: string; onChange?: (v: string) => void }
export interface MenuItem { label: ReactNode; icon?: IconName; hint?: ReactNode; end?: ReactNode; danger?: boolean; disabled?: boolean; onClick?: () => void }
export interface MenuProps { items: (MenuItem | '-')[]; label?: ReactNode }
export interface AvatarProps { name?: string; size?: number; spark?: boolean }
export interface AlertProps { tone?: Tone; title?: ReactNode; action?: ReactNode; icon?: IconName; children?: ReactNode }
export interface EmptyStateProps { icon?: IconName; tone?: 'brand' | 'danger' | 'lock'; title: ReactNode; actions?: ReactNode; children?: ReactNode }
export interface DialogProps { title: ReactNode; description?: ReactNode; icon?: IconName; tone?: Tone; size?: 'sm' | 'md'; open?: boolean; onClose?: () => void; footer?: ReactNode; children?: ReactNode }
export interface ToastProps { tone?: Tone; title: ReactNode; action?: ReactNode; onClose?: () => void; children?: ReactNode }
export interface FileTypeProps { ext: string; size?: number }
export interface AttachmentProps { name: string; kind?: 'file' | 'knowledge'; status?: 'uploading' | 'reading' | 'ready' | 'failed'; progress?: number; meta?: string; error?: string; image?: boolean; onRemove?: () => void }
export interface DataTableColumn<R> { label: ReactNode; key?: string; render?: (row: R) => ReactNode; className?: 'num' | 'shrink' | string; width?: number | string }
export interface DataTableProps<R = any> { columns: DataTableColumn<R>[]; rows: R[]; empty?: ReactNode }
export interface StatTileProps { label: ReactNode; value: ReactNode; sub?: ReactNode; children?: ReactNode }
export interface UsageMeterProps { used: number; limit: number }
export interface ChatSummary { id: string; title: string; pinned?: boolean; when: 'today' | 'week' }
export interface SidebarProps { active: string; user: { name: string; email: string }; chats: ChatSummary[]; perms: Record<string, boolean>; currentChat?: string | null; onNavigate?: (route: string) => void; onNewChat?: () => void; onOpenChat?: (id: string) => void; onChatAction?: (id: string, action: 'rename' | 'renamed' | 'pin' | 'export' | 'delete', value?: string) => void; onSignOut?: () => void }
export interface ChatListItemProps { title: string; pinned?: boolean; active?: boolean; menuOpen?: boolean; renaming?: boolean; onOpen?: () => void; onMenu?: () => void; onAction?: (a: string) => void; onRenamed?: (name: string | null) => void }
export interface AppShellProps { title: ReactNode; sidebar: SidebarProps; onSettings?: () => void; overlay?: ReactNode; children: ReactNode }
export interface Model { id: string; name: string; hint?: string; isDefault?: boolean }
export interface KnowledgeDoc { id: string; name: string; ext: string; size: string; version: number; date: string; status: Status; progress?: number; error?: string }
export interface PlusMenuProps { web?: boolean; onPick?: (kind: 'file' | 'library' | 'image' | 'web') => void }
export interface LibraryPickerProps { docs: KnowledgeDoc[]; selected?: string; onSelect?: (d: KnowledgeDoc) => void; onUpload?: () => void }
export interface ModelPickerProps { models: Model[]; value: string; onChange?: (id: string) => void }
export interface ComposerProps { size?: 'hero' | 'docked'; value: string; attachments?: (AttachmentProps & { id: string })[]; web?: boolean; models: Model[]; model: string; kbMode?: 'none' | 'all' | 'one'; kbDoc?: string | null; docs?: KnowledgeDoc[]; menu?: 'plus' | 'library' | null; streaming?: boolean; onChange?: (t: string) => void; onSend?: () => void; onStop?: () => void; onPick?: PlusMenuProps['onPick']; onPickDoc?: (d: KnowledgeDoc) => void; onKbMode?: (m: string) => void; onModel?: (id: string) => void; onMenu?: (m: string | null) => void; onRemoveAttachment?: (id: string) => void }
export type Segment = string | { b: string } | { c: number };
export interface Source { n: number; type: 'doc' | 'web'; title: string; page?: number; domain?: string; version?: number; excerpt?: string }
export interface MessageProps { role: 'user' | 'assistant'; text?: string; files?: AttachmentProps[]; paragraphs?: Segment[][]; sources?: Source[]; streaming?: boolean; revealed?: number; error?: { title: string; body: string }; openSource?: number | null; onCite?: (n: number | null) => void; onRetry?: () => void; meta?: string; status?: string }
export interface SourceListProps { sources: Source[]; open?: number | null; onOpen?: (n: number | null) => void }
export interface DocumentRowProps { doc: KnowledgeDoc; onMenu?: () => void }
