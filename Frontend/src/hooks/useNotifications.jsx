import { toast } from "react-toastify";

export const useToast = () => {

  const success = (message, options = {}) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 3000,
      ...options,
    });
  };

  const errorToast = (message, options = {}) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 4000,
      ...options,
    });
  };

  const info = (message, options = {}) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 3000,
      ...options,
    });
  };

  const warning = (message, options = {}) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 3500,
      ...options,
    });
  };

  return {
    success,
    errorToast,
    info,
    warning,
  };
};