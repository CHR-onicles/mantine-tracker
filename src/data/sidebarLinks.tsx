import {
  Icon2fa,
  IconDashboard,
  IconDatabaseImport,
  IconFingerprint,
  IconKey,
  IconReceipt2,
  IconSettings,
} from "@tabler/icons-react";


export const sidebarLinks = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "transactions", label: "Transactions", icon: IconReceipt2 },
  { link: "security", label: "Security", icon: IconFingerprint },
  { link: "keys", label: "SSH Keys", icon: IconKey },
  { link: "databases", label: "Databases", icon: IconDatabaseImport },
  { link: "auth", label: "Authentication", icon: Icon2fa },
  { link: "settings", label: "Other Settings", icon: IconSettings },
];
