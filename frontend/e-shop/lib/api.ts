import axios from "axios";
import { LoginData, SignupData, VerifyEmailData } from "./validation";

export async function registerAdmin(userData: SignupData) {
  const response = await axios.post('http://localhost:3000/admin/register', userData);
  return response.data;
}

export async function loginAdmin(adminData: LoginData) {
  const response = await axios.post('http://localhost:3000/auth/admin/login', adminData);
  return response.data;
}

export async function verifyEmail(userData: VerifyEmailData) {
  const response = await axios.post('http://localhost:3000/admin/verify-email', userData);
  return response.data;
}

export const fetchProducts = async () => {
  try {
    const res = await axios.get("http://localhost:4000/products");
    return res.data;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};