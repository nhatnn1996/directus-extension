module.exports = {
  id: "increase-something",
  handler: async (
    {
      source_collection,
      source_id,
      source_link_field,
      amount,
      target_collection,
      target_field,
    },
    { database }
  ) => {
    // 1. Validate Input
    if (!source_collection || !source_id) {
      throw new Error("Missing required: source_collection or source_id");
    }
    if (!target_collection || !target_field) {
      throw new Error("Missing required: target_collection or target_field");
    }

    // Đặt giá trị mặc định
    const linkField = source_link_field || "product_id";
    const amountToAdd = Number(amount || 0);

    // 2. Bắt đầu Transaction
    const result = await database.transaction(async (trx) => {
      // 3. Query lấy detail từ Source Collection
      const sourceItem = await trx(source_collection)
        .select("*")
        .where("id", source_id)
        .first();

      if (!sourceItem) {
        throw new Error(
          `Source item with ID "${source_id}" not found in "${source_collection}"`
        );
      }

      // 4. Lấy giá trị link ID từ source
      const targetItemId = sourceItem[linkField];

      if (!targetItemId) {
        throw new Error(
          `Link field "${linkField}" is empty in source item "${source_id}"`
        );
      }

      // 5. Query Target Collection với lock (forUpdate)
      const targetItem = await trx(target_collection)
        .select("id", target_field)
        .where("id", targetItemId)
        .first()
        .forUpdate();

      if (!targetItem) {
        throw new Error(
          `Target item with ID "${targetItemId}" not found in "${target_collection}"`
        );
      }

      const currentValue = Number(targetItem[target_field] || 0);
      const newValue = currentValue + amountToAdd;

      // 6. Update Target Collection
      await trx(target_collection)
        .where("id", targetItemId)
        .update({
          [target_field]: newValue,
        });

      return {
        source_id,
        target_id: targetItemId,
        previous_value: currentValue,
        added: amountToAdd,
        new_value: newValue,
      };
    });

    return {
      success: true,
      ...result,
    };
  },
};
