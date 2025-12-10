import type { UserRepository } from "./userRepository";
import { memoryUserRepository } from "./userRepository.memory";
import { mongoUserRepository } from "./userRepository.mongo";
import { PERSISTENCE_DRIVER } from "@/lib/env";

const driver = PERSISTENCE_DRIVER ?? "memory";

/* This is for Memory Repository
export const repo: UserRepository = memoryUserRepository;

Example:

import { mongoUserRepository } from "./userRepository.mongo";
export const repo: UserRepository = mongoUserRepository;

*/

// This is for MongoDb Repository
export const repo: UserRepository = driver === "mongo" ? mongoUserRepository : memoryUserRepository;
