export default {
  id: "inventory-deduct",
  name: "Deduct Inventory",
  icon: "inventory_2",
  description: "Trừ kho an toàn cho danh sách items",
  overview: ({ collection, quantity_field }) => [
    {
      label: "Target Collection",
      text: collection,
    },
    {
      label: "Qty Field",
      text: quantity_field,
    },
  ],
  options: [
    {
      field: "items",
      name: "Source Items (Array)",
      type: "json",
      meta: {
        width: "full",
        interface: "input-code", // Cho phép điền {{previous_step}}
        options: {
          placeholder: "{{read_orders}}",
        },
        note: "Mảng chứa danh sách các item cần trừ kho (VD: Output của bước Read Data).",
      },
    },
    {
      field: "collection",
      name: "Target Collection",
      type: "string",
      meta: {
        width: "half",
        interface: "system-collection", // Dropdown chọn bảng
        note: "Bảng chứa sản phẩm cần trừ (VD: gifts, products).",
      },
    },
    {
      field: "product_id_field",
      name: "Product ID Field (in Source)",
      type: "string",
      schema: {
        default_value: "product_id",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên trường chứa ID sản phẩm trong mảng Source (VD: gift, product_id).",
      },
    },
    {
      field: "quantity_field",
      name: "Quantity Field (in Source)",
      type: "string",
      schema: {
        default_value: "quantity",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên trường số lượng trong mảng Source.",
      },
    },
    {
      field: "inventory_field",
      name: "Inventory Field (in Target)",
      type: "string",
      schema: {
        default_value: "inventory",
      },
      meta: {
        width: "half",
        interface: "input",
        note: "Tên trường tồn kho trong bảng Target.",
      },
    },
  ],
};
