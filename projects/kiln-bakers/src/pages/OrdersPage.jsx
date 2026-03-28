import { useState } from "react";
import { orderService } from "../data/storage";
import { formatCurrency, formatDateTime } from "../utils/format";
import Topbar from "../components/Topbar";
import PrintableBill from "../components/PrintableBill";
import { settingsService } from "../data/storage";
import { Printer } from "lucide-react";

export default function OrdersPage() {
  const [orders] = useState(() => orderService.getAll().slice().reverse());
  const [settings] = useState(() => settingsService.get());
  const [viewOrder, setViewOrder] = useState(null);

  return (
    <>
      <Topbar title="Order History" />
      <div className="page-body">
        <div className="card">
          <div className="card-header">
            <span>All Orders ({orders.length})</span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Bill No</th>
                  <th>Date &amp; Time</th>
                  <th>Items</th>
                  <th>Subtotal</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 && (
                  <tr>
                    <td colSpan={8} className="empty-state">
                      No orders yet.
                    </td>
                  </tr>
                )}
                {orders.map((o) => (
                  <tr key={o.id}>
                    <td style={{ fontWeight: 600 }}>{o.billNo}</td>
                    <td style={{ whiteSpace: "nowrap" }}>
                      {formatDateTime(o.createdAt)}
                    </td>
                    <td>
                      {o.items.length} item{o.items.length > 1 ? "s" : ""}
                    </td>
                    <td>{formatCurrency(o.subtotal)}</td>
                    <td style={{ fontWeight: 600 }}>
                      {formatCurrency(o.total)}
                    </td>
                    <td>{o.paymentMethod}</td>
                    <td>
                      <span
                        className={`badge ${o.paymentStatus === "paid" ? "badge-paid" : "badge-pending"}`}
                      >
                        {o.paymentStatus === "paid" ? "Paid" : "Pending"}
                      </span>
                    </td>
                    <td>
                      <button
                        className="btn btn-ghost btn-sm"
                        onClick={() => setViewOrder(o)}
                        title="View / Print"
                      >
                        <Printer size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {viewOrder && (
          <PrintableBill
            order={viewOrder}
            settings={settings}
            onClose={() => setViewOrder(null)}
          />
        )}
      </div>
    </>
  );
}
