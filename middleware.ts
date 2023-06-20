export { default } from "next-auth/middleware";

//to protect the following routes
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
