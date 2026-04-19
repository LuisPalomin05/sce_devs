const jwt = require("jsonwebtoken");

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

const verifyToken = require("../../src/middlewares/authMiddleware");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authMiddleware.verifyToken", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("retorna 401 si no hay header Authorization", () => {
    const req = { headers: {} };
    const res = mockRes();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "No autorizado" });
    expect(next).not.toHaveBeenCalled();
  });

  test("retorna 401 si token es inválido", () => {
    jwt.verify.mockImplementation(() => {
      throw new Error("invalid token");
    });

    const req = { headers: { authorization: "Bearer token-invalido" } };
    const res = mockRes();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
    expect(next).not.toHaveBeenCalled();
  });

  test("continúa si token es válido", () => {
    const decoded = { id: 1, email: "admin@sceadmin.com" };
    jwt.verify.mockReturnValue(decoded);

    const req = { headers: { authorization: "Bearer token-valido" } };
    const res = mockRes();
    const next = jest.fn();

    verifyToken(req, res, next);

    expect(req.user).toEqual(decoded);
    expect(next).toHaveBeenCalledTimes(1);
    expect(res.status).not.toHaveBeenCalled();
  });
});
