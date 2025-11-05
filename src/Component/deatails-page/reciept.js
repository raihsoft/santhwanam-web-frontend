
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiCall } from "../Api";
const OrderReceipt = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

useEffect(() => {
  apiCall
    .get(`order/orders/${id}/`)
    .then((res) => setOrder(res.data))
    .catch((err) => console.error("Error fetching order:", err));
}, [id]);

  if (!order) {
    return <p style={{ textAlign: "center" }}>Loading order detailsaaaaaaaa...</p>;
  }

  return (
    <div className="receipt-container" style={{ width: "700px", margin: "40px auto", border: "1px solid #ccc", padding: "30px", borderRadius: "12px" }}>
      <h2 style={{ textAlign: "center", marginBottom: "20px" }}>🧾 Order Receipt</h2>
      <hr />

      <div style={{ lineHeight: "2", fontSize: "16px" }}>
        <p><strong>Order Number:</strong> {order.order_number}</p>
        <p><strong>Name:</strong> {order.order_by_name}</p>
        <p><strong>Mobile:</strong> {order.mobile}</p>
        <p><strong>Quantity:</strong> {order.quantity}</p>
        <p><strong>Delivery Place:</strong> {order.delivery_place}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Date:</strong> {new Date(order.order_date).toLocaleDateString()}</p>
      </div>

      <hr />
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          onClick={() => window.print()}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          🖨 Print Receipt
        </button>
      </div>
    </div>
  );
};

export default OrderReceipt;
