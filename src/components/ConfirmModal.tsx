import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  Box,
  Slide,
} from '@mui/material';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import type { TransitionProps } from '@mui/material/transitions';
import React from 'react';

const Transition = React.forwardRef<
  unknown,
  TransitionProps & {
    children: React.ReactElement<any, any>;
  }
>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

interface ConfirmationDialogProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal = ({
  open,
  title = 'Confirm Action',
  description = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  onConfirm,
  onCancel,
}: ConfirmationDialogProps) => {
  return (
    <Dialog
      open={open}
      onClose={(_, reason) => {
        if (reason !== 'backdropClick') onCancel();
      }}
      TransitionComponent={Transition}
      keepMounted
      maxWidth="xs"
      fullWidth
      aria-labelledby="confirm-dialog-title"
      aria-describedby="confirm-dialog-description"
      slotProps={{
        backdrop: {
          sx: {
            backdropFilter: 'blur(8px)',
            backgroundColor: 'rgba(15,23,42,0.6)',
          },
        },
      }}
      PaperProps={{
        sx: {
          borderRadius: 3,
          overflow: 'hidden',
          background: '#020617',
          color: '#fff',
          boxShadow:
            '0 30px 60px rgba(0,0,0,0.6), inset 0 0 0 1px rgba(255,255,255,0.05)',
        },
      }}
    >
      {/* HEADER */}
      <Box
        sx={{
          px: 3,
          pt: 3,
          pb: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <Box
          sx={{
            width: 44,
            height: 44,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #f97316, #ef4444)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(239,68,68,0.6)',
          }}
        >
          <WarningAmberRoundedIcon sx={{ color: '#fff' }} />
        </Box>

        <DialogTitle
          id="confirm-dialog-title"
          sx={{ p: 0, fontWeight: 700, fontSize: 18 }}
        >
          {title}
        </DialogTitle>
      </Box>

      {/* CONTENT */}
      <DialogContent sx={{ px: 3, pb: 2 }}>
        <Typography
          id="confirm-dialog-description"
          sx={{
            fontSize: 14,
            lineHeight: 1.6,
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          {description}
        </Typography>
      </DialogContent>

      {/* ACTIONS */}
      <DialogActions
        sx={{
          px: 3,
          pb: 3,
          display: 'flex',
          gap: 1.5,
        }}
      >
        <Button
          onClick={onCancel}
          sx={{
            flex: 1,
            height: 44,
            borderRadius: 2,
            color: '#cbd5f5',
            textTransform: 'none',
            border: '1px solid rgba(255,255,255,0.12)',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.05)',
            },
          }}
        >
          {cancelText}
        </Button>

        <Button
          onClick={onConfirm}
          sx={{
            flex: 1,
            height: 44,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            color: '#fff',
            background:
              'linear-gradient(135deg, #ef4444, #f97316)',
            boxShadow: '0 12px 30px rgba(239,68,68,0.6)',
            '&:hover': {
              background:
                'linear-gradient(135deg, #dc2626, #ea580c)',
              boxShadow: '0 14px 35px rgba(239,68,68,0.75)',
            },
            '&:active': {
              transform: 'scale(0.98)',
            },
          }}
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmModal;
