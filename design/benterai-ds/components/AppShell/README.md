# AppShell

Sidebar + header (page title + Settings) + scrolling content. Below `bp-md` (760px) it switches to a 56px top bar (menu / title / new chat) and the sidebar becomes a drawer, so the composer keeps the full screen. Consumer provides `title`, `sidebar` props and the page as `children`; dialogs and toasts go in `overlay`.
