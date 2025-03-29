import { useLocation } from "react-router-dom";
import SelectedOrderDetails from "./SelectedOrderDetails";

const OrderDetails = () => {
  const location = useLocation();
  const orderDetails = location.state?.orderDetails;

  if (!orderDetails) {
    return <div>No order details found.</div>;
  }

  return (
    <div className="p-4">
      <SelectedOrderDetails selectedOrder={orderDetails} />
    </div>
  );
};

export default OrderDetails;
