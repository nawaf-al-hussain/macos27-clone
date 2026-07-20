'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Wifi, BatteryMedium, Search, SlidersHorizontal } from 'lucide-react';

/* ─────────────── Types ─────────────── */

interface MenuItemDef {
  label: string;
  shortcut?: string;
  separator?: boolean;
  disabled?: boolean;
}

interface MenuBarProps {
  activeApp: string;
  onSpotlight: () => void;
  onControlCenter: () => void;
}

/* ─────────────── Menu Definitions ─────────────── */

type MenuId = 'Apple' | 'File' | 'Edit' | 'View' | 'Go' | 'Window' | 'Help' | 'History' | 'Bookmarks' | 'Message' | 'Mailbox' | 'Event' | 'Contact' | 'Reminder' | 'Note' | 'Format' | 'Board' | 'Insert' | 'Controls' | 'Library' | 'Story' | 'Store' | 'Panes';

interface AppMenuConfig {
  menus: { id: MenuId; label: string; items: MenuItemDef[] }[];
}

function makeAppleMenuItems(): MenuItemDef[] {
  return [
    { label: 'About This Mac' },
    { label: '', separator: true },
    { label: 'System Settings…' },
    { label: 'App Store…' },
    { label: '', separator: true },
    { label: 'Recent Items' },
    { label: '', separator: true },
    { label: 'Force Quit…', shortcut: '⌥⌘⎋' },
    { label: '', separator: true },
    { label: 'Sleep' },
    { label: 'Restart…' },
    { label: 'Shut Down…' },
    { label: '', separator: true },
    { label: 'Lock Screen', shortcut: '⌃⌘Q' },
    { label: 'Log Out Nawaf…', shortcut: '⇧⌘Q' },
  ];
}

function fileItemsFor(app: string): MenuItemDef[] {
  const common: MenuItemDef[] = [
    { label: 'Close Window', shortcut: '⌘W' },
    { label: '', separator: true },
    { label: 'Get Info', shortcut: '⌘I' },
    { label: 'Duplicate', shortcut: '⌘D' },
  ];

  if (app === 'Finder') {
    return [
      { label: 'New Finder Window', shortcut: '⌘N' },
      { label: 'New Folder', shortcut: '⇧⌘N' },
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'Open', shortcut: '⌘O' },
      ...common,
      { label: 'Quick Look', shortcut: '⌘Y' },
      { label: '', separator: true },
      { label: 'Move to Trash', shortcut: '⌘⌫' },
      { label: 'Empty Trash', shortcut: '⇧⌘⌫' },
      { label: '', separator: true },
      { label: 'Eject', shortcut: '⌘E' },
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Safari') {
    return [
      { label: 'New Window', shortcut: '⌘N' },
      { label: 'New Tab', shortcut: '⌘T' },
      { label: 'Open…', shortcut: '⌘O' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Mail') {
    return [
      { label: 'New Message', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Move to Trash', shortcut: '⌘⌫' },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Calendar') {
    return [
      { label: 'New Event', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Contacts') {
    return [
      { label: 'New Contact', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Reminders') {
    return [
      { label: 'New Reminder', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Notes') {
    return [
      { label: 'New Note', shortcut: '⌘N' },
      { label: 'New Folder', shortcut: '⇧⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Freeform') {
    return [
      { label: 'New Board', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Music') {
    return [
      { label: 'New Playlist', shortcut: '⌘N' },
      { label: 'New Smart Playlist', shortcut: '⌥⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  if (app === 'Podcasts') {
    return [
      { label: 'New Station', shortcut: '⌘N' },
      ...common,
      { label: '', separator: true },
      { label: 'Find…', shortcut: '⌘F' },
    ];
  }

  // Default for all other apps
  return [
    { label: 'New Window', shortcut: '⌘N' },
    { label: 'Open', shortcut: '⌘O' },
    ...common,
    { label: '', separator: true },
    { label: 'Find…', shortcut: '⌘F' },
  ];
}

const editItems: MenuItemDef[] = [
  { label: 'Undo', shortcut: '⌘Z' },
  { label: 'Redo', shortcut: '⇧⌘Z' },
  { label: '', separator: true },
  { label: 'Cut', shortcut: '⌘X' },
  { label: 'Copy', shortcut: '⌘C' },
  { label: 'Paste', shortcut: '⌘V' },
  { label: 'Select All', shortcut: '⌘A' },
  { label: '', separator: true },
  { label: 'Emoji & Symbols', shortcut: '⌃⌘Space' },
];

function viewItemsFor(app: string): MenuItemDef[] {
  if (app === 'Finder') {
    return [
      { label: 'as Icons', shortcut: '⌘1' },
      { label: 'as List', shortcut: '⌘2' },
      { label: 'as Columns', shortcut: '⌘3' },
      { label: 'as Gallery', shortcut: '⌘4' },
      { label: '', separator: true },
      { label: 'Sort By' },
      { label: 'Show View Options', shortcut: '⌘J' },
      { label: '', separator: true },
      { label: 'Show Path Bar', shortcut: '⌥⌘P' },
      { label: 'Show Status Bar', shortcut: '⌘/' },
      { label: 'Show Preview', shortcut: '⇧⌘P' },
      { label: 'Show Sidebar', shortcut: '⌥⌘S' },
      { label: 'Show Hidden Files', shortcut: '⇧⌘.' },
    ];
  }
  return [
    { label: 'Show Sidebar', shortcut: '⌥⌘S' },
    { label: 'Show Toolbar', shortcut: '⌥⌘T' },
    { label: '', separator: true },
    { label: 'Enter Full Screen', shortcut: '⌃⌘F' },
  ];
}

const goItems: MenuItemDef[] = [
  { label: 'Back', shortcut: '⌘[' },
  { label: 'Forward', shortcut: '⌘]' },
  { label: 'Enclosing Folder', shortcut: '⌘↑' },
  { label: '', separator: true },
  { label: 'Recents', shortcut: '⇧⌘F' },
  { label: 'AirDrop', shortcut: '⇧⌘R' },
  { label: 'Documents', shortcut: '⇧⌘O' },
  { label: 'Desktop', shortcut: '⇧⌘D' },
  { label: 'Downloads', shortcut: '⌥⌘L' },
  { label: 'Home', shortcut: '⇧⌘H' },
  { label: 'Computer', shortcut: '⇧⌘C' },
  { label: 'iCloud Drive', shortcut: '⇧⌘I' },
  { label: 'Applications', shortcut: '⇧⌘A' },
  { label: 'Utilities', shortcut: '⇧⌘U' },
  { label: '', separator: true },
  { label: 'Go to Folder…', shortcut: '⇧⌘G' },
];

const windowItems: MenuItemDef[] = [
  { label: 'Minimize', shortcut: '⌘M' },
  { label: 'Zoom' },
  { label: 'Fill' },
  { label: 'Center' },
  { label: 'Move & Resize' },
  { label: '', separator: true },
  { label: 'Merge All Windows' },
];

const helpItems: MenuItemDef[] = [
  { label: 'macOS Help' },
  { label: 'Search' },
];

// App-specific extra menus
function historyItems(): MenuItemDef[] {
  return [
    { label: 'Show All History', shortcut: '⌘Y' },
    { label: '', separator: true },
    { label: 'Clear History…' },
  ];
}

function bookmarksItems(): MenuItemDef[] {
  return [
    { label: 'Show Bookmarks', shortcut: '⌥⌘B' },
    { label: '', separator: true },
    { label: 'Add Bookmark', shortcut: '⌘D' },
  ];
}

function messageItems(): MenuItemDef[] {
  return [
    { label: 'New Message', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Reply', shortcut: '⌘R' },
    { label: 'Forward', shortcut: '⇧⌘F' },
  ];
}

function mailboxItems(): MenuItemDef[] {
  return [
    { label: 'New Mailbox…' },
    { label: '', separator: true },
    { label: 'Inbox' },
    { label: 'Sent' },
    { label: 'Drafts' },
    { label: 'Junk' },
    { label: 'Trash' },
  ];
}

function eventItems(): MenuItemDef[] {
  return [
    { label: 'New Event', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Edit Event' },
    { label: 'Delete Event' },
  ];
}

function contactItems(): MenuItemDef[] {
  return [
    { label: 'New Contact', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Edit Contact' },
    { label: 'Delete Contact' },
    { label: '', separator: true },
    { label: 'Send Email' },
    { label: 'Share Contact' },
  ];
}

function reminderItems(): MenuItemDef[] {
  return [
    { label: 'New Reminder', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Mark as Completed' },
    { label: 'Delete' },
  ];
}

function noteItems(): MenuItemDef[] {
  return [
    { label: 'New Note', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Pin' },
    { label: 'Lock' },
    { label: 'Delete' },
  ];
}

function formatItems(): MenuItemDef[] {
  return [
    { label: 'Bold', shortcut: '⌘B' },
    { label: 'Italic', shortcut: '⌘I' },
    { label: 'Underline', shortcut: '⌘U' },
    { label: 'Strikethrough', shortcut: '⇧⌘X' },
    { label: '', separator: true },
    { label: 'Lists' },
    { label: 'Tables' },
    { label: '', separator: true },
    { label: 'Title' },
    { label: 'Heading' },
    { label: 'Body' },
  ];
}

function boardItems(): MenuItemDef[] {
  return [
    { label: 'New Board', shortcut: '⌘N' },
    { label: '', separator: true },
    { label: 'Export as PDF…' },
    { label: 'Export as Image…' },
  ];
}

function insertItems(): MenuItemDef[] {
  return [
    { label: 'Text' },
    { label: 'Shape' },
    { label: 'Image' },
    { label: 'Sticky Note' },
    { label: 'Pen Drawing' },
    { label: 'Link' },
  ];
}

function controlsItems(app: string): MenuItemDef[] {
  if (app === 'Music' || app === 'Podcasts') {
    return [
      { label: 'Play/Pause', shortcut: 'Space' },
      { label: 'Next Track', shortcut: '⌘→' },
      { label: 'Previous Track', shortcut: '⌘←' },
      { label: '', separator: true },
      { label: 'Volume Up' },
      { label: 'Volume Down' },
      { label: 'Mute' },
    ];
  }
  if (app === 'TV') {
    return [
      { label: 'Play/Pause', shortcut: 'Space' },
      { label: 'Fast Forward' },
      { label: 'Rewind' },
      { label: '', separator: true },
      { label: 'Volume Up' },
      { label: 'Volume Down' },
      { label: 'Mute' },
      { label: '', separator: true },
      { label: 'Subtitles' },
      { label: 'Audio Track' },
    ];
  }
  return [];
}

function libraryItems(app: string): MenuItemDef[] {
  if (app === 'Music') {
    return [
      { label: 'Playlists' },
      { label: 'Artists' },
      { label: 'Albums' },
      { label: 'Songs' },
      { label: '', separator: true },
      { label: 'Radio' },
      { label: 'Browse' },
    ];
  }
  if (app === 'Podcasts') {
    return [
      { label: 'Listen Now' },
      { label: 'Browse' },
      { label: 'Top Charts' },
      { label: 'Search' },
    ];
  }
  return [];
}

function storyItems(): MenuItemDef[] {
  return [
    { label: 'Save Story' },
    { label: 'Share Story' },
    { label: '', separator: true },
    { label: 'Open in Safari' },
  ];
}

function storeItems(): MenuItemDef[] {
  return [
    { label: 'Discover' },
    { label: 'Top Charts' },
    { label: 'Categories' },
    { label: 'Updates' },
    { label: '', separator: true },
    { label: 'My Apps' },
  ];
}

function panesItems(): MenuItemDef[] {
  return [
    { label: 'General' },
    { label: 'Appearance' },
    { label: 'Accessibility' },
    { label: 'Control Center' },
    { label: 'Desktop & Dock' },
    { label: 'Displays' },
    { label: 'Wallpaper' },
    { label: 'Sound' },
    { label: 'Notifications' },
    { label: 'Privacy & Security' },
  ];
}

/* ─────────────── App Menu Registry ─────────────── */

function getAppMenuConfig(appName: string): AppMenuConfig {
  const appleMenu: { id: MenuId; label: string; items: MenuItemDef[] } = {
    id: 'Apple',
    label: '',
    items: makeAppleMenuItems(),
  };

  const baseMenus: { id: MenuId; label: string; items: MenuItemDef[] }[] = [
    { id: 'File', label: 'File', items: fileItemsFor(appName) },
    { id: 'Edit', label: 'Edit', items: editItems },
    { id: 'View', label: 'View', items: viewItemsFor(appName) },
    { id: 'Window', label: 'Window', items: windowItems },
    { id: 'Help', label: 'Help', items: helpItems },
  ];

  switch (appName) {
    case 'Finder':
      return {
        menus: [
          appleMenu,
          { id: 'File', label: 'File', items: fileItemsFor('Finder') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Finder') },
          { id: 'Go', label: 'Go', items: goItems },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Safari':
      return {
        menus: [
          appleMenu,
          { id: 'History', label: 'History', items: historyItems() },
          { id: 'Bookmarks', label: 'Bookmarks', items: bookmarksItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Safari') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Safari') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Messages':
      return {
        menus: [
          appleMenu,
          { id: 'Message', label: 'Message', items: messageItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Messages') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Messages') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Mail':
      return {
        menus: [
          appleMenu,
          { id: 'Message', label: 'Message', items: messageItems() },
          { id: 'Mailbox', label: 'Mailbox', items: mailboxItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Mail') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Mail') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Maps':
      return {
        menus: [appleMenu, ...baseMenus],
      };

    case 'Photos':
      return {
        menus: [appleMenu, ...baseMenus],
      };

    case 'FaceTime':
      return {
        menus: [appleMenu, ...baseMenus],
      };

    case 'Phone':
      return {
        menus: [appleMenu, ...baseMenus],
      };

    case 'Calendar':
      return {
        menus: [
          appleMenu,
          { id: 'View', label: 'View', items: viewItemsFor('Calendar') },
          { id: 'Event', label: 'Event', items: eventItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Calendar') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Calendar') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Contacts':
      return {
        menus: [
          appleMenu,
          { id: 'Contact', label: 'Contact', items: contactItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Contacts') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Contacts') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Reminders':
      return {
        menus: [
          appleMenu,
          { id: 'Reminder', label: 'Reminder', items: reminderItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Reminders') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Reminders') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Notes':
      return {
        menus: [
          appleMenu,
          { id: 'Note', label: 'Note', items: noteItems() },
          { id: 'Format', label: 'Format', items: formatItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Notes') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Notes') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Freeform':
      return {
        menus: [
          appleMenu,
          { id: 'Board', label: 'Board', items: boardItems() },
          { id: 'Insert', label: 'Insert', items: insertItems() },
          { id: 'File', label: 'File', items: fileItemsFor('Freeform') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Freeform') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Music':
      return {
        menus: [
          appleMenu,
          { id: 'Controls', label: 'Controls', items: controlsItems('Music') },
          { id: 'Library', label: 'Library', items: libraryItems('Music') },
          { id: 'File', label: 'File', items: fileItemsFor('Music') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Music') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Podcasts':
      return {
        menus: [
          appleMenu,
          { id: 'Controls', label: 'Controls', items: controlsItems('Podcasts') },
          { id: 'Library', label: 'Library', items: libraryItems('Podcasts') },
          { id: 'File', label: 'File', items: fileItemsFor('Podcasts') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('Podcasts') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'TV':
      return {
        menus: [
          appleMenu,
          { id: 'Controls', label: 'Controls', items: controlsItems('TV') },
          { id: 'File', label: 'File', items: fileItemsFor('TV') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('TV') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'News':
      return {
        menus: [
          appleMenu,
          { id: 'Story', label: 'Story', items: storyItems() },
          { id: 'File', label: 'File', items: fileItemsFor('News') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('News') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'Games':
      return {
        menus: [appleMenu, ...baseMenus],
      };

    case 'App Store':
      return {
        menus: [
          appleMenu,
          { id: 'Store', label: 'Store', items: storeItems() },
          { id: 'File', label: 'File', items: fileItemsFor('App Store') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('App Store') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    case 'System Settings':
      return {
        menus: [
          appleMenu,
          { id: 'Panes', label: 'Panes', items: panesItems() },
          { id: 'File', label: 'File', items: fileItemsFor('System Settings') },
          { id: 'Edit', label: 'Edit', items: editItems },
          { id: 'View', label: 'View', items: viewItemsFor('System Settings') },
          { id: 'Window', label: 'Window', items: windowItems },
          { id: 'Help', label: 'Help', items: helpItems },
        ],
      };

    default:
      return { menus: [appleMenu, ...baseMenus] };
  }
}

/* ─────────────── Dropdown Menu Component ─────────────── */

function DropdownMenu({ items }: { items: MenuItemDef[] }) {
  return (
    <div className="menubar-dropdown z-[600] min-w-[220px]">
      {items.map((item, i) => {
        if (item.separator) {
          return <div key={`sep-${i}`} className="menubar-dropdown-divider" />;
        }
        return (
          <div key={item.label + i} className="menubar-dropdown-item">
            <span>{item.label}</span>
            {item.shortcut && <span className="menu-shortcut">{item.shortcut}</span>}
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────── Wi-Fi Dropdown ─────────────── */

function WifiDropdown() {
  return (
    <div className="menubar-dropdown z-[600] min-w-[260px]">
      <div className="px-2.5 py-1.5 flex items-center justify-between">
        <span className="text-[13px] text-white/90 font-medium">Wi-Fi</span>
        <div
          className="w-[30px] h-[18px] rounded-full bg-green-500 relative cursor-pointer"
        >
          <div className="absolute right-[2px] top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" />
        </div>
      </div>
      <div className="menubar-dropdown-divider" />
      {/* Connected network */}
      <div className="menubar-dropdown-item" style={{ background: 'rgba(255,255,255,0.06)' }}>
        <span className="flex items-center gap-2">
          <svg width="14" height="11" viewBox="0 0 16 12" fill="white" fillOpacity="0.8">
            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
            <path d="M4.5 8.5a5 5 0 017 0" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-1)"/>
            <path d="M1.5 5.5a9 9 0 0113 0" stroke="white" strokeOpacity="0.8" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          CoffeeShop_Guest
        </span>
        <span className="menu-shortcut" style={{ color: '#34C759' }}>✓</span>
      </div>
      {/* Other networks */}
      <div className="menubar-dropdown-item">
        <span className="flex items-center gap-2">
          <svg width="14" height="11" viewBox="0 0 16 12" fill="white" fillOpacity="0.35">
            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
            <path d="M4.5 8.5a5 5 0 017 0" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-1)"/>
            <path d="M1.5 5.5a9 9 0 0113 0" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          xfinitywifi
        </span>
      </div>
      <div className="menubar-dropdown-item">
        <span className="flex items-center gap-2">
          <svg width="14" height="11" viewBox="0 0 16 12" fill="white" fillOpacity="0.35">
            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
            <path d="M4.5 8.5a5 5 0 017 0" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-1)"/>
            <path d="M1.5 5.5a9 9 0 0113 0" stroke="white" strokeOpacity="0.35" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          Pretty Fly for a Wi-Fi
        </span>
      </div>
      {/* Disabled network */}
      <div className="menubar-dropdown-item" style={{ opacity: 0.4, cursor: 'default' }}>
        <span className="flex items-center gap-2">
          <svg width="14" height="11" viewBox="0 0 16 12" fill="white" fillOpacity="0.2">
            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3z" transform="translate(0,-2)"/>
            <path d="M4.5 8.5a5 5 0 017 0" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none" strokeLinecap="round" transform="translate(0,-1)"/>
            <path d="M1.5 5.5a9 9 0 0113 0" stroke="white" strokeOpacity="0.2" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
          </svg>
          HomeNet-5G
        </span>
        <span className="menu-shortcut">🔒</span>
      </div>
      <div className="menubar-dropdown-divider" />
      <div className="menubar-dropdown-item">
        <span>Network Settings…</span>
      </div>
    </div>
  );
}

/* ─────────────── Battery Dropdown ─────────────── */

function BatteryDropdown() {
  return (
    <div className="menubar-dropdown z-[600] min-w-[240px]">
      <div className="px-2.5 py-2">
        <div className="text-[13px] text-white/90 font-medium">Battery: 86%</div>
        <div className="text-[11px] text-white/50 mt-0.5">Power Source: Battery</div>
      </div>
      <div className="menubar-dropdown-divider" />
      <div className="menubar-dropdown-item">
        <span>Show Percentage</span>
        <div
          className="w-[30px] h-[18px] rounded-full bg-green-500 relative"
        >
          <div className="absolute right-[2px] top-[2px] w-[14px] h-[14px] rounded-full bg-white shadow-sm" />
        </div>
      </div>
      <div className="menubar-dropdown-divider" />
      <div className="menubar-dropdown-item">
        <span>Battery Settings…</span>
      </div>
    </div>
  );
}

/* ─────────────── MenuBar Component ─────────────── */

export default function MenuBar({ activeApp, onSpotlight, onControlCenter }: MenuBarProps) {
  const [time, setTime] = useState(new Date());
  const [showAppleMenu, setShowAppleMenu] = useState(false);
  const [showMenu, setShowMenu] = useState<string | null>(null);
  const [showWifi, setShowWifi] = useState(false);
  const [showBattery, setShowBattery] = useState(false);
  const [dropdownAnchor, setDropdownAnchor] = useState<{ top: number; left: number } | null>(null);
  const menuBarRef = useRef<HTMLDivElement>(null);

  const menuConfig = getAppMenuConfig(activeApp);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const closeAllMenus = useCallback(() => {
    setShowAppleMenu(false);
    setShowMenu(null);
    setShowWifi(false);
    setShowBattery(false);
    setDropdownAnchor(null);
  }, []);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (menuBarRef.current && !menuBarRef.current.contains(e.target as Node)) {
        closeAllMenus();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [closeAllMenus]);

  // Clock format: "Mon Jul 20  6:27 PM"
  const dayStr = time.toLocaleDateString('en-US', { weekday: 'short' });
  const monthStr = time.toLocaleDateString('en-US', { month: 'short' });
  const dateNum = time.getDate();
  const timeStr = time.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  // Double space between date and time
  const clockStr = `${dayStr} ${monthStr} ${dateNum}  ${timeStr}`;

  const getAnchor = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setDropdownAnchor({ top: rect.bottom + 4, left: rect.left });
  };

  const handleMenuClick = useCallback((menuId: string, e: React.MouseEvent<HTMLButtonElement>) => {
    if (showMenu === menuId) {
      setShowMenu(null);
      setDropdownAnchor(null);
    } else {
      setShowAppleMenu(false);
      setShowMenu(menuId);
      setShowWifi(false);
      setShowBattery(false);
      getAnchor(e);
    }
  }, [showMenu]);

  const handleAppleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (showAppleMenu) {
      setShowAppleMenu(false);
      setDropdownAnchor(null);
    } else {
      setShowAppleMenu(true);
      setShowMenu(null);
      setShowWifi(false);
      setShowBattery(false);
      getAnchor(e);
    }
  }, [showAppleMenu]);

  const handleWifiClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (showWifi) {
      setShowWifi(false);
      setDropdownAnchor(null);
    } else {
      setShowWifi(true);
      setShowAppleMenu(false);
      setShowMenu(null);
      setShowBattery(false);
      getAnchor(e);
    }
  }, [showWifi]);

  const handleBatteryClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (showBattery) {
      setShowBattery(false);
      setDropdownAnchor(null);
    } else {
      setShowBattery(true);
      setShowAppleMenu(false);
      setShowMenu(null);
      setShowWifi(false);
      getAnchor(e);
    }
  }, [showBattery]);

  const dropdownStyle: React.CSSProperties = dropdownAnchor
    ? { position: 'fixed', top: dropdownAnchor.top, left: dropdownAnchor.left }
    : { display: 'none' };

  return (
    <>
    <div
      ref={menuBarRef}
      className="glass-menubar fixed top-0 left-0 right-0 flex items-center px-2 select-none"
      data-solid="false"
      style={{
        height: 'var(--menubar-h)',
        zIndex: 'var(--z-menubar)',
        fontSize: '14px',
        transform: 'translateY(0)',
        transition: 'transform 300ms var(--ease-out-strong)',
      }}
    >
      {/* Apple Logo */}
      <button
        className="menubar-item"
        data-menu-id="Apple"
        onClick={handleAppleClick}
      >
        <svg width="15" height="15" viewBox="0 0 898 1024" fill="var(--label)">
          <path d="M898.1 348.1c-2.2-14.3-14.3-25.3-28.6-25.3H648.6c-7.7-59.2-34.5-114.2-78.5-156.1-52.1-49.9-120.3-77.4-192.1-77.4s-140 27.5-192.1 77.4c-44 41.9-70.8 96.9-78.5 156.1H28.5C14.3 322.8 2.2 333.8 0 348.1c-0.7 4.4 0.5 8.8 2.9 12.5l434.1 658.4c5.5 8.3 14.8 13.3 24.8 13.3h0.1c10 0 19.3-5 24.8-13.3l408.6-619.7c0 0 0 0 0.1-0.1l25.4-38.5c2.5-3.8 3.7-8.2 2.9-12.6zm-134.9 10.2L462 927.1 52.9 358.3h710.3zM377.9 200.2c39.3-37.6 90.9-58.3 145.2-58.3s105.9 20.7 145.2 58.3c33.9 32.5 56.1 75.4 63.7 121.5H314.2c7.6-46.1 29.8-89 63.7-121.5z"/>
        </svg>
      </button>

      {/* Active App Name */}
      <span className="menubar-item font-semibold menubar-text">{activeApp}</span>

      {/* Menu Items */}
      {menuConfig.menus.slice(1).map((menu) => (
        <button
          key={menu.id}
          className="menubar-item menubar-text"
          data-menu-id={menu.id}
          onClick={(e) => handleMenuClick(menu.id, e)}
        >
          {menu.label}
        </button>
      ))}

      <div className="flex-1" />

      {/* Right side items */}
      <div className="flex items-center">
        {/* Wi-Fi */}
        <button
          className="menubar-item"
          onClick={handleWifiClick}
        >
          <Wifi size={15} style={{ color: 'var(--label)' }} />
        </button>

        {/* Battery */}
        <button
          className="menubar-item"
          onClick={handleBatteryClick}
        >
          <BatteryMedium size={19} style={{ color: 'var(--label)' }} />
        </button>

        {/* Spotlight */}
        <button className="menubar-item" onClick={onSpotlight}>
          <Search size={14} style={{ color: 'var(--label)' }} />
        </button>

        {/* Siri */}
        <button className="menubar-item" style={{ padding: '0 6px' }}>
          <div
            style={{
              width: '16px',
              height: '16px',
              borderRadius: '50%',
              background: 'conic-gradient(from 0deg, #ff6b6b, #feca57, #48dbfb, #ff9ff3, #ff6b6b)',
            }}
          />
        </button>

        {/* Control Center */}
        <button className="menubar-item" onClick={onControlCenter}>
          <SlidersHorizontal size={14} style={{ color: 'var(--label)' }} />
        </button>

        {/* Clock */}
        <div
          className="menubar-item menubar-text"
          style={{
            fontVariantNumeric: 'tabular-nums' as const,
            whiteSpace: 'pre' as const,
          }}
        >
          {clockStr}
        </div>
      </div>
    </div>

    {/* Dropdowns (rendered outside the menubar for proper fixed positioning) */}
    {showAppleMenu && dropdownAnchor && (
      <div style={dropdownStyle} className="z-[9200]">
        <DropdownMenu items={menuConfig.menus[0].items} />
      </div>
    )}
    {showMenu && dropdownAnchor && (
      <div style={dropdownStyle} className="z-[9200]">
        <DropdownMenu items={menuConfig.menus.find(m => m.id === showMenu)?.items || []} />
      </div>
    )}
    {showWifi && dropdownAnchor && (
      <div style={dropdownStyle} className="z-[9200]">
        <WifiDropdown />
      </div>
    )}
    {showBattery && dropdownAnchor && (
      <div style={dropdownStyle} className="z-[9200]">
        <BatteryDropdown />
      </div>
    )}
    </>
  );
}