import { useEffect, useState } from "react";
import {
  Paper,
  TextField,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
} from "@mui/material";
import {
  Person,
  Business,
  Email,
  Phone,
  LocationOn,
  Notes,
  Group,
} from "@mui/icons-material";
import { useAuth } from "../../context/authContext";
import { getAllUsers } from "../../api/user.api";
import { createCustomer } from "../../api/customer.api";
import { useNavigate } from "react-router-dom";

const AddCustomer = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdminOrManager =
    user?.role === "admin" || user?.role === "manager";

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    salesId: "",
  });

  const [salesUsers, setSalesUsers] = useState<
    { _id: string; name: string }[]
  >([]);

  useEffect(() => {
    if (isAdminOrManager) {
      getAllUsers().then(setSalesUsers);
    }
  }, [isAdminOrManager]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    if (!form.name.trim()) {
      alert("Customer name is required");
      return;
    }
    try {
      await createCustomer(form);
      navigate("/customers");
    } catch (error) {
      console.error(error);
      alert("Failed to create customer");
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Add New Customer
      </h1>

      <Paper elevation={3} className="p-6 rounded-xl space-y-6">
        {/* Basic Info */}
        <div className="flex items-center gap-2 text-gray-700">
          <Person />
          <h2 className="font-semibold">Basic Information</h2>
        </div>

        <Divider />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <TextField
            label="Customer Name"
            name="name"
            required
            fullWidth
            value={form.name}
            onChange={handleChange}
          />

          <TextField
            label="Company"
            name="company"
            fullWidth
            value={form.company}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            name="email"
            fullWidth
            value={form.email}
            onChange={handleChange}
          />

          <TextField
            label="Phone"
            name="phone"
            fullWidth
            value={form.phone}
            onChange={handleChange}
          />
        </div>

        {/* Address & Notes */}
        <div className="grid grid-cols-1 gap-4">
          <TextField
            label="Address"
            name="address"
            fullWidth
            value={form.address}
            onChange={handleChange}
            InputProps={{
              startAdornment: <LocationOn className="mr-2 text-gray-400" />,
            }}
          />

          <TextField
            label="Notes"
            name="notes"
            fullWidth
            multiline
            rows={3}
            value={form.notes}
            onChange={handleChange}
            InputProps={{
              startAdornment: <Notes className="mr-2 text-gray-400" />,
            }}
          />
        </div>

        {/* Role-based Assignment */}
        {isAdminOrManager && (
          <>
            <Divider />

            <div className="flex items-center gap-2 text-gray-700">
              <Group />
              <h2 className="font-semibold">Assign Sales Executive</h2>
            </div>

            <FormControl fullWidth size="small">
              <InputLabel>Sales User</InputLabel>
              <Select
                label="Sales User"
                value={form.salesId}
                onChange={(e) =>
                  setForm({ ...form, salesId: e.target.value })
                }
              >
                <MenuItem value="">Self</MenuItem>
                {salesUsers.map((sales) => (
                  <MenuItem key={sales._id} value={sales._id}>
                    {sales.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </>
        )}

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
          >
            Save
          </Button>
        </div>
      </Paper>
    </div>
  );
};

export default AddCustomer;
