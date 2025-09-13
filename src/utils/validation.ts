export const usernameRx = /^[A-Za-z0-9_]{3,20}$/;
export const noroffEmailRx = /^[A-Za-z0-9._%+-]+@stud\.noroff\.no$/i;
export const passwordRx = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;

export function validateUsername(v: string) {
  if (!v) return "Username is required";
  if (!usernameRx.test(v)) return "3–20 chars, letters/numbers/_ only";
  return "";
}

export function validateEmail(v: string) {
  if (!v) return "Email is required";
  if (!noroffEmailRx.test(v)) return "Use your stud.noroff.no email";
  return "";
}

export function validatePassword(v: string) {
  if (!v) return "Password is required";
  if (!passwordRx.test(v)) return "Min 8 chars, include a letter and a number";
  return "";
}
