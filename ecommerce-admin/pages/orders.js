import Layout from "@/components/Layout";
import React, { useEffect, useState } from "react";
import axios from "axios";

export default function OrderPage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  console.log({ orders });
  return (
    <Layout>
      <h1> orders</h1>
      <table className="basic ">
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            orders.map((order) => (
              <tr key={order._id}>
                <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                <td>
                  {order.name} {order.email} <br />
                  {order.city} {order.postalCode}
                  {order.country} <br />
                  {order.streetAddress}
                </td>
                <td>
                  {order.line_items.map((l) => (
                    <>
                      {l.price_data?.product_data?.name} * {l.quantity} <br />
                    </>
                  ))}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
