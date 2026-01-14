module.exports = {
  id: "inventory-deduct",
  handler: async (
    { items, collection, product_id_field, quantity_field, inventory_field },
    { database }
  ) => {
    // 1. Validate Input cơ bản
    if (!items || !Array.isArray(items) || items.length === 0) {
      // Không có gì để xử lý thì return luôn cho nhẹ
      return { success: true, message: "No items to process" };
    }

    // Set giá trị mặc định nếu người dùng không điền
    const f_prodId = product_id_field || "product_id";
    const f_qty = quantity_field || "quantity";
    const f_inv = inventory_field || "inventory";

    // 2. Bắt đầu Transaction (Quan trọng nhất)
    // Dùng transaction để đảm bảo "Được ăn cả, ngã về không"
    await database.transaction(async (trx) => {
      for (const item of items) {
        const productId = item[f_prodId];
        const qtyToDeduct = Number(item[f_qty] || 1); // Mặc định là 1 nếu không có field qty

        if (!productId) continue; // Bỏ qua nếu không có ID sản phẩm

        // 3. Query lấy tồn kho hiện tại (có khóa dòng - lock row để tránh race condition)
        // .forUpdate() giúp lock dòng này lại, người khác không update được cho đến khi ta xong
        const product = await trx(collection)
          .select("id", f_inv) // Select field inventory động
          .where("id", productId)
          .first()
          .forUpdate();

        if (!product) {
          throw new Error(
            `Product ID "${productId}" not found in collection "${collection}"`
          );
        }

        const currentInv = Number(product[f_inv] || 0);

        // 4. Kiểm tra điều kiện âm kho
        if (currentInv - qtyToDeduct < 0) {
          // Ném lỗi sẽ kích hoạt Rollback toàn bộ transaction
          throw new Error(
            `Insufficient inventory for Product ID "${productId}". Current: ${currentInv}, Required: ${qtyToDeduct}`
          );
        }

        // 5. Update trừ kho
        await trx(collection)
          .where("id", productId)
          .update({
            [f_inv]: currentInv - qtyToDeduct,
          });
      }
    });

    // 6. Trả về kết quả cho Flow biết
    return {
      success: true,
      processed_count: items.length,
    };
  },
};
