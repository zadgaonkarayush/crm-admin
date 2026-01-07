import {
  Paper,
  TextField,
  Typography,
  Button,
  Stack,
  Divider,
  Box,
  CircularProgress,
  InputAdornment,
} from "@mui/material";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import StorageOutlinedIcon from "@mui/icons-material/StorageOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProductById } from "../../api/product.api";
import type { UpdateProductPayload } from "../../types/product.types";

const ProductView = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<UpdateProductPayload>({
    sku: "",
    name: "",
    description: "",
    price: 0,
    stock: 0,
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        if (id) {
          const res = await getProductById(id);
          setFormData(res);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Box className="min-h-[60vh] flex items-center justify-center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      className="min-h-screen flex items-center justify-center px-4"
      sx={{
        background: "linear-gradient(135deg, #fff8e1, #ffffff)",
      }}
    >
      <Paper
        elevation={5}
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
              backgroundColor: "warning.light",
              width: 56,
              height: 56,
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Inventory2OutlinedIcon color="warning" fontSize="large" />
          </Box>

          <Typography variant="h5" fontWeight={700}>
            Product Details
          </Typography>

          <Typography variant="body2" color="text.secondary">
            View product information
          </Typography>
        </Stack>

        <Divider sx={{ my: 3 }} />

        {/* Product Fields */}
        <Stack spacing={3}>
          <TextField label="SKU" value={formData.sku} fullWidth disabled />

          <TextField label="Product Name" value={formData.name} fullWidth disabled />

          <TextField
            label="Description"
            value={formData.description}
            multiline
            rows={3}
            fullWidth
            disabled
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
              value={formData.price}
              fullWidth
              disabled
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <CurrencyRupeeIcon fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Stock"
              value={formData.stock}
              fullWidth
              disabled
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
        <Stack direction="row" justifyContent="flex-end" sx={{ mt: 4 }}>
          <Button
            variant="contained"
            color="warning"
            onClick={() => navigate("/products")}
          >
            Close
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default ProductView;
