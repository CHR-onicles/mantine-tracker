import {
  IconDashboard,
  IconDatabaseImport,
  IconFiles,
  IconPigMoney,
  IconReceipt2,
  IconSettings,
} from "@tabler/icons-react";


export const sidebarLinks = [
  { link: "dashboard", label: "Dashboard", icon: IconDashboard },
  { link: "transactions", label: "Transactions", icon: IconReceipt2 },
  { link: "accounts", label: "Accounts", icon: IconDatabaseImport },
  { link: "budgets", label: "Budgets", icon: IconPigMoney },
  { link: "reports", label: "Reports", icon: IconFiles },
  { link: "settings", label: "Settings", icon: IconSettings },
];
