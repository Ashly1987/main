import { useState } from "react";
import { settingsService } from "../data/storage";
import Topbar from "../components/Topbar";
import { CATEGORIES } from "../data/seedProducts";
import toast from "react-hot-toast";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const [form, setForm] = useState(settingsService.get());

  const set = (key, val) => setForm((f) => ({ ...f, [key]: val }));

  const handleSave = (e) => {
    e.preventDefault();
    settingsService.save(form);
    toast.success("Settings saved!");
  };

  return (
    <>
      <Topbar title="Settings" />
      <div className="page-body" style={{ maxWidth: 600 }}>
        <div className="card">
          <div className="card-header">Store Settings</div>
          <form onSubmit={handleSave}>
            <div className="card-body">
              <div className="form-group">
                <label className="form-label">Store Name</label>
                <input
                  className="form-control"
                  value={form.storeName}
                  onChange={(e) => set("storeName", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Address</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={form.storeAddress}
                  onChange={(e) => set("storeAddress", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone</label>
                <input
                  className="form-control"
                  value={form.storePhone}
                  onChange={(e) => set("storePhone", e.target.value)}
                />
              </div>
              <div className="form-group">
                <label className="form-label">GST / Tax Rate (%)</label>
                <input
                  className="form-control"
                  type="number"
                  min={0}
                  max={30}
                  value={form.taxRate}
                  onChange={(e) => set("taxRate", Number(e.target.value))}
                />
              </div>
              <hr
                style={{
                  border: "none",
                  borderTop: "1px solid var(--border)",
                  margin: "16px 0",
                }}
              />
              <p style={{ fontWeight: 600, marginBottom: 12 }}>
                UPI Payment Details
              </p>
              <div className="form-group">
                <label className="form-label">UPI ID</label>
                <input
                  className="form-control"
                  value={form.upiId}
                  onChange={(e) => set("upiId", e.target.value)}
                  placeholder="yourname@upi"
                />
              </div>
              <div className="form-group">
                <label className="form-label">
                  Merchant Name (shown on QR)
                </label>
                <input
                  className="form-control"
                  value={form.upiName}
                  onChange={(e) => set("upiName", e.target.value)}
                />
              </div>
            </div>
            <div
              className="modal-footer"
              style={{ justifyContent: "flex-end", padding: "14px 20px" }}
            >
              <button type="submit" className="btn btn-primary">
                <Save size={14} /> Save Settings
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
