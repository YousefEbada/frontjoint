import { BlobPort } from './blob.port.js';
export const blobAzureAdapter: BlobPort = {
  async upload(path, _bytes) {
    // TODO: integrate @azure/storage-blob
    return { url: `https://blob.local/${encodeURIComponent(path)}` };
  },
  async signedUrl(path, _ttl) {
    return `https://blob.local/${encodeURIComponent(path)}?sig=dev`;
  }
};
