import { randomResponseTimer } from "../../utils";

export function getPaginatedData() {
  const totalRows = randomResponseTimer(500, 300);
  const rows = Array.from({ length: totalRows })
    .fill(0)
    .map((_, i) => i + 1);

  return {
    total: totalRows,
    page: function (
      page: number,
      limit = 10,
    ): Promise<{ data: number[]; totalRows: number; page: number }> {
      return new Promise((resolve) => {
        const timer = randomResponseTimer(10, 3) * 100
        setTimeout(() => {
          const offset = (page - 1) * limit;
          const data = rows.slice(offset, offset + limit);
          resolve({
            data,
            totalRows,
            page: page ?? 1,
          });
        }, timer)
      });
    },
  };
}
