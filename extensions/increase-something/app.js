export default {
  id: "increase-something",
  name: "Increase Something",
  icon: "add_circle",
  description: "Tăng giá trị của một trường trong collection bất kỳ",
  overview: ({ collection, item_id, field, amount }) => [
    {
      label: "Collection",
      text: collection,
    },
    {
      label: "Item ID",
      text: item_id,
    },
    {
      label: "Field",
      text: field,
    },
    {
      label: "Amount",
      text: amount,
    },
  ],
  options: [
    {
      field: "collection",
      name: "Target Collection",
      type: "string",
      meta: {
        width: "half",
        interface: "system-collection",
        note: "Bảng chứa item cần cập nhật.",
      },
    },
    {
      field: "item_id",
      name: "Item ID",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
        note: "ID của bản ghi cần tăng giá trị (có thể dùng {{ }}).",
      },
    },
    {
      field: "field",
      name: "Field Name",
      type: "string",
      meta: {
        width: "half",
        interface: "input",
        note: "Tên trường (field) cần cộng thêm giá trị.",
      },
    },
    {
      field: "amount",
      name: "Amount to Increase",
      type: "integer",
      meta: {
        width: "half",
        interface: "input",
        note: "Số lượng cần cộng thêm (có thể dùng {{ }}).",
      },
    },
  ],
};
