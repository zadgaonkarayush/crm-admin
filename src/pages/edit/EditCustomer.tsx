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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import {
  Person,
  LocationOn,
  Notes,
  Group,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { getCustomerById, updateCustomer } from "../../api/customer.api";
import { getAllUsers } from "../../api/user.api";
import { useAuth } from "../../context/authContext";
import { showError, showSuccess } from "../../utils/toast";

const EditCustomer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();

  const isAdmin = user?.role === "admin";
  const isManager = user?.role === "manager";
  const isAdminOrManager = isAdmin || isManager;

  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
    salesId: "",
  });

  const [loading, setLoading] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [salesUsers, setSalesUsers] = useState<{ _id: string; name: string }[]>([]);

  useEffect(() => {
    if (id) {
      getCustomerById(id).then((data) => {
        setForm({
          name: data.name || "",
          company: data.company || "",
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
          notes: data.notes || "",
          salesId:
            typeof data.createdBy === "string"
              ? ""
              : data.createdBy?._id || "",
        });
        setLoading(false);
      });
    }

    if (isAdminOrManager) {
      getAllUsers().then(setSalesUsers);
    }
  }, [id, isAdminOrManager]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    try {
      if (!id) return;
      console.log(form)
            console.log(id)

      await updateCustomer(id, form);
      showSuccess('Customer updated successfully!')
      navigate("/customers");
    } catch (error) {
      console.error(error);
      showError("Failed to update customer");
    }
  };

  if (loading) {
    return <p className="text-gray-500">Loading customer details...</p>;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <h1 className="text-2xl font-semibold text-gray-800">
        Edit Customer
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
              startAdornment: (
                <LocationOn className="mr-2 text-gray-400" />
              ),
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

        {/* Sales Assignment */}
        {isAdminOrManager && (
          <>
            <Divider />
            <div className="flex items-center gap-2 text-gray-700">
              <Group />
              <h2 className="font-semibold">Assigned Sales Executive</h2>
            </div>

            <FormControl fullWidth size="small">
              <InputLabel>Sales User</InputLabel>
              <Select
                label="Sales User"
                value={form.salesId}
                onChange={(e) =>
                  isAdmin && setForm({ ...form, salesId: e.target.value })
                }
                disabled={!isAdmin} // only admin can change
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
            variant="outlined"
            color="warning"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="success"
            onClick={() => setConfirmOpen(true)}
          >
            Save Changes
          </Button>
        </div>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Confirm Update</DialogTitle>
        <DialogContent>
          Are you sure you want to save these changes to this customer?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmOpen(false)}>Cancel</Button>
          <Button variant="contained" color="success" onClick={handleUpdate}>
            Yes, Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EditCustomer;
