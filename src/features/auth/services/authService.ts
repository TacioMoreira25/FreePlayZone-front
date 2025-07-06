import axios from "axios";
import type {
  LoginDTO,
  RegisterDTO,
  AuthResponse,
  UpdateUserRequestDTO,
  UpdatePasswordRequestDTO,
} from "../types";

const api = axios.create({
  baseURL: "http://localhost:8080/auth",
  headers: {
    "Content-Type": "application/json",
  },
});

export async function register(data: RegisterDTO): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/register", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Email já está em uso");
    }
    throw new Error("Erro ao registrar usuário");
  }
}

export async function login(data: LoginDTO): Promise<AuthResponse> {
  try {
    const response = await api.post<AuthResponse>("/login", data);
    return response.data;
  } catch (error: any) {
    if (error.response?.status === 400) {
      throw new Error("Email ou senha inválidos");
    }
    throw new Error("Erro ao fazer login");
  }
}

export async function updateUser(data: UpdateUserRequestDTO): Promise<void> {
  try {
    await api.put("/update-user", data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    }
    throw new Error("Erro ao atualizar usuário");
  }
}
export async function updatePassword(data: UpdatePasswordRequestDTO): Promise<void> {
  try {
    await api.put("/update-password", data);
  } catch (error: any) {
    if (error.response?.status === 404) {
      throw new Error("Usuário não encontrado");
    }
    throw new Error("Erro ao atualizar senha de usuário");
  }
}

export const authService = {
  register,
  login,
  updateUser,
  updatePassword,
};
