import {
  Paper,
  Chip,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  MenuItem,
  Select,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Order } from "../../types/order.types";
import { getOrderById, updateOrderStatus } from "../../api/orders.api";

const ViewOrder = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);
  const [status, setStatus] = useState<
    "pending" | "completed" | "cancelled" | "shipped"
  >("pending");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;

    getOrderById(id).then((data) => {
      setOrder(data);
      setStatus(data.status ?? "pending");
    });
  }, [id]);

 
  if (loading || !order) {
        return (
          <div className="flex justify-center py-10">
            <CircularProgress />
          </div>
        );
      }
    

  // ✅ Calculations
  const subtotal = order.lines.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const totalTax = order.lines.reduce(
    (sum, item) => sum + item.tax,
    0
  );

  const total = subtotal + totalTax;

  const getStatusColor = () => {
    if (status === "completed") return "success";
    if (status === "pending") return "warning";
    if (status === "cancelled") return "error";
    if (status === "shipped") return "info";
    return "default";
  };

  const handleSaveStatus = async() => {
  if(!id) return;
  try{
    setLoading(true)
    const updated = await updateOrderStatus(id,status);
    setOrder(updated);
setStatus(updated.status);

  }catch(error){
    
   console.error("Failed to update status", error);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <Box className="space-y-6">
      {/* Header */}
      <Box className="flex justify-between items-center">
        <Typography variant="h4" fontWeight={600}>
          Order Details
        </Typography>
        <Chip
          label={status.toUpperCase()}
          color={getStatusColor()}
          sx={{ fontWeight: "bold" }}
        />
      </Box>

      {/* Order Summary */}
      <Paper sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
        <Typography>
          <strong>Order ID:</strong> {order._id}
        </Typography>
        <Typography>
          <strong>Date:</strong>{" "}
          {new Date(order.createdAt).toLocaleDateString()}
        </Typography>
      </Paper>

      {/* Customer & Admin */}
      <Box className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Customer
          </Typography>
          {order.customer ? (
            <>
              <Typography>{order.customer.name}</Typography>
              <Typography>{order.customer.email}</Typography>
            </>
          ) : (
            <Typography color="text.secondary">
              Guest / Walk-in Customer
            </Typography>
          )}
        </Paper>

        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" fontWeight={600} mb={1}>
            Created By
          </Typography>
          <Typography>{order.createdBy.name}</Typography>
          <Typography color="text.secondary">
            Role: {order.createdBy.role}
          </Typography>
        </Paper>
      </Box>

      {/* Items */}
      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight={600} mb={2}>
          Order Items
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Product ID</TableCell>
                <TableCell>Qty</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Tax</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.lines.map((item) => (
                <TableRow key={item.product._id}>
                  <TableCell>{item.product.name}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price.toLocaleString()}</TableCell>
                  <TableCell>₹{item.tax.toLocaleString()}</TableCell>
                  <TableCell>
                    ₹
                    {(item.quantity * item.price + item.tax).toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Totals */}
      <Paper sx={{ p: 3 }}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal</Typography>
          <Typography>₹{subtotal.toLocaleString()}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Tax</Typography>
          <Typography>₹{totalTax.toLocaleString()}</Typography>
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box display="flex" justifyContent="space-between" fontWeight={600}>
          <Typography>Total</Typography>
          <Typography>₹{total.toLocaleString()}</Typography>
        </Box>
      </Paper>

      {/* Status */}
      <Paper sx={{ p: 3, display: "flex", justifyContent: "space-between" }}>
        <Select
          size="small"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </Select>

        <Box display="flex" gap={2}>
          <Button variant="contained" color='warning' onClick={() => navigate("/orders")}>
            Back
          </Button>
          <Button variant="contained" onClick={handleSaveStatus}>
            Save Status
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default ViewOrder;
