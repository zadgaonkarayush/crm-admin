import {
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
  InputAdornment,
  Box,
  CircularProgress,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById, updateProduct } from "../../api/product.api";
import type { CreateProductPayload } from "../../types/product.types";

const EditProduct = () => {
  const navigate = useNavigate();
  const {id} = useParams<{id:string}>();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<CreateProductPayload>({
    name: "",
    description: "",
    price: 0,
    stock:0,
  });

 useEffect(() => {
  const fetchProduct = async () => {
    try {
      if (id) {
        setLoading(true);
        const res = await getProductById(id);

        setFormData({
          name: res.name ?? "",
          description: res.description ?? "",
          price: (res.price ?? 0),
          stock: (res.stock ??0),
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchProduct();
}, [id]);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onHandleSubmit = async () => {
    if (!id) return;
    try {
      setLoading(true);
      await updateProduct(id,{
          ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock),
      });
      navigate(-1);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4"
      sx={{
        background: "linear-gradient(135deg, #e8f5e9, #ffffff)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          width: "100%",
          maxWidth: 560,
          borderRadius: 4,
          p: { xs: 3, sm: 4 },
        }}
      >
        {/* Header */}
        <Stack alignItems="center" spacing={1}>
          <Box
            sx={{
              backgroundColor: "primary.light",
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2OutlinedIcon fontSize="large"  />
          </Box>

          <Typography variant="h5" fontWeight={700}>
           Edit Product
          </Typography>

        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Form */}
        <Stack spacing={3}>
          <TextField
            label="Product Name"
            name="name"
            fullWidth
            required
            value={formData.name}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Inventory2OutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <TextField
            label="Description"
            name="description"
            multiline
            rows={3}
            fullWidth
            value={formData.description}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <DescriptionOutlinedIcon fontSize="small" />
                </InputAdornment>
              ),
            }}
          />

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
            <TextField
              label="Price"
              name="price"
              type="number"
              fullWidth
              required
              value={formData.price}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Stock Quantity"
              name="stock"
              type="number"
              fullWidth
              required
              value={formData.stock}
              onChange={handleChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <StorageOutlinedIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>
        </Stack>

        {/* Actions */}
        <Stack
          direction={{ xs: "column", sm: "row" }}
          justifyContent="flex-end"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="contained"
            color="warning"
            fullWidth
            onClick={() => navigate("/products")}
          >
            Cancel
          </Button>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            disabled={loading}
            onClick={onHandleSubmit}
            startIcon={
              loading ? <CircularProgress size={18} color="inherit" /> : null
            }
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default EditProduct;
