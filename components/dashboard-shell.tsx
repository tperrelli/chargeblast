import type { ReactNode } from "react";
import { Icon } from "./icons";

type DashboardShellProps = { children: ReactNode };

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="dashboard">
      <aside className="sidebar" aria-label="Dashboard navigation">
        <div className="workspace">
          <div className="workspace-logo">a</div>
          <div className="workspace-name">
            Acme Studio <span>Test mode</span>
          </div>
          <Icon name="chevronDown" size={15} />
        </div>
        <nav className="side-nav" aria-label="Main navigation">
          <div className="nav-item">
            <Icon name="home" /> <span>Home</span>
          </div>
          <div className="nav-item selected">
            <Icon name="payments" /> <span>Payments</span>
          </div>
          <div className="nav-subitem active">Transactions</div>
          <div className="nav-item">
            <Icon name="balance" /> <span>Balances</span>
          </div>
          <div className="nav-item">
            <Icon name="customers" /> <span>Customers</span>
          </div>
          <div className="nav-item">
            <Icon name="catalog" /> <span>Product catalog</span>
          </div>
        </nav>
        <div className="sidebar-bottom">
          <div className="test-dot" /> Test data <span>On</span>
        </div>
      </aside>
      <div className="main-area">
        <header className="topbar">
          <div className="mobile-brand">
            <div className="workspace-logo">a</div>
            <strong>Acme Studio</strong>
          </div>
          <div className="global-search">
            <Icon name="search" size={17} />
            <span>Search</span>
            <kbd>/</kbd>
          </div>
          <div className="top-actions">
            <span className="test-pill">Test mode</span>
            <span className="top-icon" aria-label="Help">
              <Icon name="help" size={18} />
            </span>
            <span className="top-icon" aria-label="Notifications">
              <Icon name="bell" size={18} />
            </span>
            <span className="top-icon" aria-label="Settings">
              <Icon name="settings" size={18} />
            </span>
            <div className="avatar">A</div>
          </div>
        </header>
        <main className="content">{children}</main>
      </div>
    </div>
  );
}
