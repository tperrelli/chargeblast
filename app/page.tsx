import { Suspense } from "react";
import { DashboardShell } from "@/components/dashboard-shell";
import { Icon } from "@/components/icons";
import { PaymentsContent } from "@/features/payments/components/payments-content";

export default function Home() {
  return (
    <DashboardShell>
      <div className="breadcrumbs">
        <span>Payments</span>
        <Icon name="chevronRight" size={14} />
        <span>Transactions</span>
      </div>
      <div className="page-heading">
        <div>
          <h1>Transactions</h1>
          <p>View and manage your transactions.</p>
        </div>
      </div>
      <div className="tabs">
        <div className="tab active-tab">Payments</div>
      </div>
      <Suspense
        fallback={
          <div className="payments-section" role="status">
            Loading payments…
          </div>
        }
      >
        <PaymentsContent />
      </Suspense>
    </DashboardShell>
  );
}
