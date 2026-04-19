const bcrypt = require("bcrypt");
const userModel = require("../../src/models/userModel");

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
}));

jest.mock("../../src/models/userModel", () => ({
  evalUserTenant: jest.fn(),
  setUserTenant: jest.fn(),
  newPassword: jest.fn(),
}));

const { setTenantActiva, updatePassword } = require("../../src/controllers/userController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("userController", () => {
  let consoleErrorSpy;

  beforeEach(() => {
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe("setTenantActiva", () => {
    test("retorna 403 si usuario no pertenece al tenant", async () => {
      userModel.evalUserTenant.mockResolvedValue([]);

      const req = { user: { id: 1 }, body: { tenant_id: 2 } };
      const res = mockRes();

      await setTenantActiva(req, res);

      expect(res.status).toHaveBeenCalledWith(403);
      expect(res.json).toHaveBeenCalledWith({ message: "No autorizado" });
      expect(userModel.setUserTenant).not.toHaveBeenCalled();
    });

    test("actualiza tenant activa y retorna 200", async () => {
      userModel.evalUserTenant.mockResolvedValue([{ ok: 1 }]);
      userModel.setUserTenant.mockResolvedValue();

      const req = { user: { id: 1 }, body: { tenant_id: 2 } };
      const res = mockRes();

      await setTenantActiva(req, res);

      expect(userModel.setUserTenant).toHaveBeenCalledWith(1, 2);
      expect(res.json).toHaveBeenCalledWith({ message: "Tenant activa actualizada" });
    });

    test("retorna 500 en error inesperado", async () => {
      userModel.evalUserTenant.mockRejectedValue(new Error("db fail"));

      const req = { user: { id: 1 }, body: { tenant_id: 2 } };
      const res = mockRes();

      await setTenantActiva(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error del servidor" });
    });
  });

  describe("updatePassword", () => {
    test("retorna 400 si password es inválida", async () => {
      const req = { user: { id: 1 }, body: { password: "123" } };
      const res = mockRes();

      await updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({ message: "Contraseña inválida" });
      expect(bcrypt.hash).not.toHaveBeenCalled();
    });

    test("actualiza password y retorna 200", async () => {
      bcrypt.hash.mockResolvedValue("hash123");
      userModel.newPassword.mockResolvedValue();

      const req = { user: { id: 7 }, body: { password: "nuevaClave123" } };
      const res = mockRes();

      await updatePassword(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("nuevaClave123", 10);
      expect(userModel.newPassword).toHaveBeenCalledWith("hash123", 7);
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: "actividad actualizada" });
    });

    test("retorna 500 en error inesperado", async () => {
      bcrypt.hash.mockRejectedValue(new Error("hash fail"));

      const req = { user: { id: 1 }, body: { password: "nuevaClave123" } };
      const res = mockRes();

      await updatePassword(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ message: "Error al actualizar" });
    });
  });
});
