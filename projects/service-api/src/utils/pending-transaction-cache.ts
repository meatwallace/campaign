import TTLCache from '@isaacs/ttlcache';
import { VerificationType } from '~/schema/types/verification-type';

interface TransactionData {
  action: VerificationType;
  attempts: number;
  ipAddress: string;
  sessionID: null | string;
  target: string;
}

/**
 * 5 minute in memory cache to allowlist transaction IDs. This:
 *
 * * binds transaction IDs to their assosciated data to prevent cross-transaction attacks
 * * prevents reply attacks by tracking the verification attempts for a specific transaction ID
 *
 * The cache is of the format:
 *
 * {
 *   [transactionID]: TransactionData,
 * }
 */
export const pendingTransactionCache = new TTLCache<string, TransactionData>({
  ttl: 5 * 60 * 1000,
});
