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
  { link: "#", label: "Dashboard", icon: IconDashboard },
  { link: "#", label: "Billing", icon: IconReceipt2 },
  { link: "#", label: "Security", icon: IconFingerprint },
  { link: "#", label: "SSH Keys", icon: IconKey },
  { link: "#", label: "Databases", icon: IconDatabaseImport },
  { link: "#", label: "Authentication", icon: Icon2fa },
  { link: "#", label: "Other Settings", icon: IconSettings },
];
