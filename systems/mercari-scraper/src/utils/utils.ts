import { pbkdf2Sync, randomBytes } from "crypto";
import { Prisma } from "../../prisma/client";

class Utils {
  static encryptBySalt(input: string, salt = randomBytes(16).toString("hex")) {
    const hash = pbkdf2Sync(input, salt, 1000, 64, "sha256").toString("hex");
    return { hash, salt };
  }

  static isPrismaError(err: any) {
    return (
      err instanceof Prisma.PrismaClientKnownRequestError ||
      err instanceof Prisma.PrismaClientUnknownRequestError ||
      err instanceof Prisma.PrismaClientRustPanicError ||
      err instanceof Prisma.PrismaClientInitializationError ||
      err instanceof Prisma.PrismaClientValidationError
    );
  }
}

export default Utils;
