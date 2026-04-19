const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../../src/models/userModel");
const userRepository = require("../../src/models/userRepository");
const tenantRepository = require("../../src/models/tenantRepository");

jest.mock("bcrypt", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

jest.mock("../../src/models/userModel", () => ({
  createUser: jest.fn(),
  findByEmail: jest.fn(),
}));

jest.mock("../../src/models/userRepository", () => ({
  getUserById: jest.fn(),
}));

jest.mock("../../src/models/tenantRepository", () => ({
  getTenantsByUserId: jest.fn(),
}));

const { register, login, findUserById } = require("../../src/controllers/authController");

const mockRes = () => {
  const res = {};
  res.status = jest.fn().mockReturnValue(res);
  res.json = jest.fn().mockReturnValue(res);
  return res;
};

describe("authController", () => {
  let consoleErrorSpy;
  let consoleLogSpy;

  beforeEach(() => {
    process.env.JWT_SECRET = "test-secret";
    consoleErrorSpy = jest.spyOn(console, "error").mockImplementation(() => {});
    consoleLogSpy = jest.spyOn(console, "log").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleErrorSpy.mockRestore();
    consoleLogSpy.mockRestore();
    jest.clearAllMocks();
  });

  describe("register", () => {
    test("crea usuario y retorna 201", async () => {
      bcrypt.hash.mockResolvedValue("hash123");
      userModel.createUser.mockResolvedValue(25);

      const req = {
        body: {
          nombres: "Ana",
          apellidos: "QA",
          email: "ana@test.com",
          password: "admin123",
          id_rol: 1,
        },
      };
      const res = mockRes();

      await register(req, res);

      expect(bcrypt.hash).toHaveBeenCalledWith("admin123", 10);
      expect(userModel.createUser).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: "Usuario creado", userId: 25 });
    });

    test("retorna 500 cuando ocurre error", async () => {
      bcrypt.hash.mockRejectedValue(new Error("hash error"));
      const req = { body: {} };
      const res = mockRes();

      await register(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error en registro" });
    });
  });

  describe("login", () => {
    test("retorna 401 si usuario no existe", async () => {
      userModel.findByEmail.mockResolvedValue(null);

      const req = { body: { email: "x@test.com", password: "abc" } };
      const res = mockRes();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Credenciales inválidas" });
    });

    test("retorna 401 si password no coincide", async () => {
      userModel.findByEmail.mockResolvedValue({
        id_usuario: 1,
        nombres: "Admin",
        apellidos: "SCE",
        password_hash: "hash",
      });
      bcrypt.compare.mockResolvedValue(false);

      const req = { body: { email: "admin@sceadmin.com", password: "wrong" } };
      const res = mockRes();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: "Credenciales inválidas" });
    });

    test("retorna token si credenciales son correctas", async () => {
      userModel.findByEmail.mockResolvedValue({
        id_usuario: 1,
        nombres: "Admin",
        apellidos: "SCE",
        password_hash: "hash",
      });
      bcrypt.compare.mockResolvedValue(true);
      jwt.sign.mockReturnValue("token-mock");

      const req = { body: { email: "admin@sceadmin.com", password: "admin123" } };
      const res = mockRes();

      await login(req, res);

      expect(jwt.sign).toHaveBeenCalled();
      expect(res.json).toHaveBeenCalledWith({ token: "token-mock" });
    });

    test("retorna 500 en error inesperado", async () => {
      userModel.findByEmail.mockRejectedValue(new Error("db error"));
      const req = { body: { email: "a", password: "b" } };
      const res = mockRes();

      await login(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: "Error en login" });
    });
  });

  describe("findUserById", () => {
    test("retorna 404 si no encuentra usuario", async () => {
      userRepository.getUserById.mockResolvedValue(null);

      const req = { user: { id: 10 } };
      const res = mockRes();

      await findUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: "Usuario no encontrado" });
    });

    test("retorna usuario y tenant activa por coincidencia", async () => {
      userRepository.getUserById.mockResolvedValue({
        id_usuario: 1,
        nombres: "Admin",
        apellidos: "SCE",
        email: "admin@sceadmin.com",
        tenant_activo_id: 2,
      });
      tenantRepository.getTenantsByUserId.mockResolvedValue([
        { id_tenant: 1, razon_social: "A" },
        { id_tenant: 2, razon_social: "B" },
      ]);

      const req = { user: { id: 1 } };
      const res = mockRes();

      await findUserById(req, res);

      expect(res.json).toHaveBeenCalledWith(
        expect.objectContaining({
          id: 1,
          email: "admin@sceadmin.com",
          tenant_activa: { id_tenant: 2, razon_social: "B" },
        }),
      );
    });

    test("retorna 500 en error inesperado", async () => {
      userRepository.getUserById.mockRejectedValue(new Error("boom"));
      const req = { user: { id: 1 } };
      const res = mockRes();

      await findUserById(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.stringContaining("Error interno") }));
    });
  });
});
