
import "./globals.css";
import '@mantine/core/styles.css';
import { MantineProvider } from "@mantine/core";
import DashboardLayout from "./components/dashboard-layout/dashboard-layout";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // suppressHydrationWarning
  return (
    <html lang="en" >
      <body
        
      >
        <MantineProvider><DashboardLayout>{children}</DashboardLayout></MantineProvider>
      </body>
    </html>
  );
}
