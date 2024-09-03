import jwt from "jsonwebtoken";

export const generateJWT = (uid: string, role: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { uid, role },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "10h",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token as string);
        }
      }
    );
  });
};
