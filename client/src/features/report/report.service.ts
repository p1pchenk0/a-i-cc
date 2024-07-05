import type { RawReport } from '@/features/report/types';
import { apiClient } from '@/shared/api/api.client';

export const reportService = {
  async getReport(month: number, year: number): Promise<{ success: boolean; report: RawReport }> {
    try {
      const result = await apiClient.get<RawReport>('report', {
        params: {
          month,
          year
        }
      });

      return { success: true, report: result.data };
    } catch (err) {
      return {
        success: false,
        report: {
          taxesToPay: 0,
          ordersMade: 0,
          printsDone: 0,
          printsWon: 0,
          totalIncome: 0,
          totalGifted: 0
        }
      };
    }
  }
};
