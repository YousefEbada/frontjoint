import {
  BlobServiceClient,
  StorageSharedKeyCredential
} from "@azure/storage-blob";
import { env } from "./env.js";

export const containerName = env.AZURE_STORAGE_CONTAINER_NAME!;

const accountName = env.AZURE_STORAGE_ACCOUNT_NAME!;
const accountKey = env.AZURE_STORAGE_ACCOUNT_KEY!;
export const sharedKeyCredential = new StorageSharedKeyCredential(accountName, accountKey);

/**
 * In dev we often use Azurite (`UseDevelopmentStorage=true`) which is NOT reachable via
 * `https://devstoreaccount1.blob.core.windows.net`. Using `fromConnectionString` ensures
 * the correct local endpoint is used.
 */
export const blobServiceClient = env.AZURE_BLOB_CONN
  ? BlobServiceClient.fromConnectionString(env.AZURE_BLOB_CONN)
  : new BlobServiceClient(`https://${accountName}.blob.core.windows.net`, sharedKeyCredential);

export const storageAccountName = accountName;