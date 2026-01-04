import { Alert } from "@mui/material";

interface ErrorStateProps {
  message?: string;
}

const ErrorState = ({ message = "Something went wrong" }: ErrorStateProps) => {
  return (
    <div className="flex justify-center py-6">
      <Alert severity="error">
        {message}
      </Alert>
    </div>
  );
};

export default ErrorState;
