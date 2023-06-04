import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const infoStyle = {
  background: '#b99ec0',
  color: '#5f269c',
  borderRadius: '40px',
  fontSize: '16px',
};

export const toastInfo = message => {
  toast.info(message, {
    style: infoStyle,
  });
};
