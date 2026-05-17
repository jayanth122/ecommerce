function CartHeader({ hasSelectedItems, selectAllItems, deselectAllItems }) {
  return (
    <>
      <h1 style={{ marginBottom: "5px" }}>
        <b>Shopping Cart</b>
      </h1>
      {hasSelectedItems ? (
        <span
          onClick={deselectAllItems}
          style={{ color: "blue", textDecoration: "none", cursor: "pointer" }}
        >
          Deselect all items
        </span>
      ) : (
        <span>
          No items selected.{" "}
          <span
            onClick={selectAllItems}
            style={{ color: "blue", textDecoration: "none", cursor: "pointer" }}
          >
            Select all items
          </span>
        </span>
      )}
    </>
  );
}

export default CartHeader;
