import { ObjectId } from "mongodb";
import type { DbUser } from "@/types/user";
import type { UserRepository, CreateUserInput } from "./userRepository";
import { getDb } from "@/lib/db/mongoClient";
import { HttpError } from "@/lib/errors";

const COLLECTION = "users";

function mapDocToDbUser(doc: any): DbUser {
  return {
    id: doc._id.toHexString(),
    email: doc.email,
    role: doc.role,
    passwordHash: doc.passwordHash,
    createdAt: doc.createdAt.toISOString(),
    passwordResetToken: doc.passwordResetToken ?? null,
    passwordResetExpiresAt: doc.passwordResetExpiresAt
      ? doc.passwordResetExpiresAt.toISOString()
      : null,
  };
}

export const mongoUserRepository: UserRepository = {
  async findByEmail(email) {
    const db = await getDb();
    const normalizedEmail = email.trim().toLowerCase();

    const doc = await db.collection(COLLECTION).findOne({ email: normalizedEmail });
    return doc ? mapDocToDbUser(doc) : null;
  },

  async findById(id) {
    const db = await getDb();
    const doc = await db.collection(COLLECTION).findOne({ _id: new ObjectId(id) });

    return doc ? mapDocToDbUser(doc) : null;
  },

  async createUser(data: CreateUserInput) {
    const db = await getDb();
    const normalizedEmail = data.email.trim().toLowerCase();

    // same behaviour as memory repo
    const existing = await db.collection(COLLECTION).findOne({ email: normalizedEmail });
    if (existing) {
      throw new HttpError(409, "User already exists", "AUTH_EMAIL_ALREADY_EXISTS");
    }

    const now = new Date();

    const result = await db.collection(COLLECTION).insertOne({
      email: normalizedEmail,
      role: data.role,
      passwordHash: data.passwordHash,
      createdAt: now,
      passwordResetToken: null,
      passwordResetExpiresAt: null,
    });

    return {
      id: result.insertedId.toHexString(),
      email: normalizedEmail,
      role: data.role,
      passwordHash: data.passwordHash,
      createdAt: now.toISOString(),
      passwordResetToken: null,
      passwordResetExpiresAt: null,
    };
  },

  async updatePassword(userId, passwordHash) {
    const db = await getDb();
    const res = await db
      .collection(COLLECTION)
      .updateOne({ _id: new ObjectId(userId) }, { $set: { passwordHash } });

    if (res.matchedCount === 0) {
      throw new HttpError(404, "User does not exist", "USER_NOT_FOUND");
    }
  },

  async setPasswordResetToken(userId, token, expiresAt) {
    const db = await getDb();
    const res = await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          passwordResetToken: token,
          passwordResetExpiresAt: expiresAt,
        },
      },
    );

    if (res.matchedCount === 0) {
      throw new HttpError(404, "User does not exist", "USER_NOT_FOUND");
    }
  },

  async findByPasswordResetToken(token) {
    const db = await getDb();
    const now = new Date();

    const doc = await db.collection(COLLECTION).findOne({
      passwordResetToken: token,
      passwordResetExpiresAt: { $gt: now },
    });

    return doc ? mapDocToDbUser(doc) : null;
  },

  async clearPasswordResetToken(userId) {
    const db = await getDb();
    await db.collection(COLLECTION).updateOne(
      { _id: new ObjectId(userId) },
      {
        $set: {
          passwordResetToken: null,
          passwordResetExpiresAt: null,
        },
      },
    );
  },
};
