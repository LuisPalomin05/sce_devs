const pool = require("../../src/config/db");

jest.mock("../../src/config/db", () => ({
  query: jest.fn(),
}));

const { getDashboard } = require("../../src/controllers/dashboard.controller");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("dashboard.controller.getDashboard", () => {
  let consoleLogSpy;

  beforeEach(() => {
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    jest.clearAllMocks();
  });

  test("retorna dashboard consolidado", async () => {
    pool.query
      .mockResolvedValueOnce([
        [
          [{ ventasHoy: 100 }],
          [{ ventasMes: 500 }],
          [{ productos: 4 }],
          [{ usuarios: 3 }],
          [{ fecha: "2026-04-17", dia: "Friday", total: 100 }],
          [{ id: 1, total: 100, created_at: "2026-04-17" }],
        ],
      ])
      .mockResolvedValueOnce([[{ total: 50 }]])
      .mockResolvedValueOnce([[{ total: 250 }]])
      .mockResolvedValueOnce([[{ tipo: "venta", total: 100, created_at: "2026-04-17", id: 1 }]]);

    const req = { headers: { "x-tenant-id": "1" } };
    const res = mockRes();

    await getDashboard(req, res);

    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        ventasHoy: 100,
        ventasMes: 500,
        productos: 4,
        usuarios: 3,
        porcentajeHoy: 100,
        porcentajeMes: 100,
      }),
    );
  });

  test("retorna 500 cuando falla consulta", async () => {
    pool.query.mockRejectedValue(new Error("db error"));

    const req = { headers: { "x-tenant-id": "1" } };
    const res = mockRes();

    await getDashboard(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Error dashboard" });
  });
});
