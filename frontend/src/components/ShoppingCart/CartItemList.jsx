function CartItemsList({ cartItems }) {
  return (
    <>
      <span style={{ float: "right" }}>Price</span>
      <hr />
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {cartItems.map((item, index) => (
          <li key={index}>
            <strong>Product ID:</strong> {item.productId} |
            <strong> Quantity:</strong> {item.quantity} |
            <strong> Selected:</strong> {item.selected ? "true" : "false"}
          </li>
        ))}
      </ul>
      <hr />
    </>
  );
}

export default CartItemsList;
