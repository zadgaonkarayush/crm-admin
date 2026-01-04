import {
  Paper,
  Divider,
  Button,
  Chip,
} from "@mui/material";
import {
  Person,
  Business,
  Email,
  Phone,
  LocationOn,
  Notes,
  Badge,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import type { Customer } from "../../types/customer.types";
import { useEffect, useState } from "react";
import { getCustomerById } from "../../api/customer.api";
import { useAuth } from "../../context/authContext";

const InfoRow = ({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value?: string;
}) => (
  <div className="flex items-start gap-3">
    <div className="text-green-600">{icon}</div>
    <div>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-gray-800 font-medium">{value || "-"}</p>
    </div>
  </div>
);

const ViewCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [customer, setCustomer] = useState<Customer | null>(null);

  useEffect(() => {
    if (id) {
      getCustomerById(id).then(setCustomer);
    }
  }, [id]);

  if (!customer) {
    return <p className="text-gray-500">Loading customer...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-800">
          Customer Details
        </h1>
        <Chip
          label="Active"
          color="success"
          size="small"
        />
      </div>

      {/* Customer Info Card */}
      <Paper elevation={3} className="p-6 space-y-5 rounded-xl">
        <InfoRow
          icon={<Person />}
          label="Customer Name"
          value={customer.name}
        />

        <InfoRow
          icon={<Business />}
          label="Company"
          value={customer.company}
        />

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoRow
            icon={<Email />}
            label="Email"
            value={customer.email}
          />
          <InfoRow
            icon={<Phone />}
            label="Phone"
            value={customer.phone}
          />
        </div>

        <Divider />

        <InfoRow
          icon={<LocationOn />}
          label="Address"
          value={customer.address}
        />

        <InfoRow
          icon={<Notes />}
          label="Notes"
          value={customer.notes}
        />
      </Paper>

      {/* Sales Info (Admin / Manager Only) */}
      {(user?.role === "admin" || user?.role === "manager") &&
        typeof customer.createdBy !== "string" && (
          <Paper elevation={2} className="p-5 rounded-xl bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <Badge color="primary" />
              <h2 className="text-lg font-semibold text-gray-700">
                Assigned Sales
              </h2>
            </div>

            <Divider className="mb-4" />

            <p className="text-gray-700">
              <strong>Name:</strong> {customer.createdBy.name}
            </p>
            <p className="text-gray-700">
              <strong>Email:</strong> {customer.createdBy.email}
            </p>
          </Paper>
        )}

      {/* Actions */}
      <div className="flex justify-end">
        <Button
          variant="contained"
          color="warning"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      </div>
    </div>
  );
};

export default ViewCustomer;
