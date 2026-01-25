export default {
  id: "increase-something",
  name: "Increase Something",
  icon: "add_circle",
  description: "Lấy dữ liệu từ Collection nguồn, dùng để tăng giá trị trên Collection đích",
  overview: ({ source_collection, target_collection, target_field }) => [
    {
      label: "Source",
      text: source_collection,
    },
    {
      label: "Target",
      text: target_collection,
    },
    {
      label: "Field to Update",
      text: target_field,
    },
  ],
  options: [
    // === SOURCE SECTION ===
    {
      field: "source_collection",
      name: "Source Collection",
      type: "string",
      meta: {
        width: "half",
        interface: "system-collection",
        note: "Collection nguồn chứa dữ liệu (VD: orders, order_items).",
      },
    },
    {
      field: "source_id",
      name: "Source Item ID",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
        note: "ID của item nguồn (VD: {{$trigger.key}}).",
      },
    },
    {
      field: "source_link_field",
      name: "Source Link Field",
      type: "string",
      schema: {
        default_value: "product_id",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên field trong Source chứa ID liên kết đến Target (VD: product_id, gift_id).",
      },
    },
    {
      field: "source_amount_field",
      name: "Source Amount Field",
      type: "string",
      schema: {
        default_value: "quantity",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên field trong Source chứa số lượng cần cộng (VD: quantity, amount).",
      },
    },
    // === TARGET SECTION ===
    {
      field: "target_collection",
      name: "Target Collection",
      type: "string",
      meta: {
        width: "half",
        interface: "system-collection",
        note: "Collection đích cần cập nhật (VD: products, gifts).",
      },
    },
    {
      field: "target_field",
      name: "Target Field to Increase",
      type: "string",
      schema: {
        default_value: "total_sold",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên field trong Target sẽ được cộng thêm giá trị (VD: total_sold, usage_count).",
      },
    },
  ],
};
