import type { RawReport } from '@/features/report/types';
import { apiClient } from '@/shared/api/api.client';

const emptyReport: RawReport = {
  taxesToPay: 0,
  ordersMade: 0,
  printsDone: 0,
  printsWon: 0,
  totalIncome: 0,
  totalGifted: 0
};

export const reportService = {
  async getCustomReport(income: number): Promise<{ success: boolean; report: RawReport }> {
    try {
      const result = await apiClient.get<RawReport>('report', {
        params: {
          custom: true,
          income: income * 100
        }
      });

      return { success: true, report: result.data };
    } catch (err) {
      return {
        success: false,
        report: { ...emptyReport }
      };
    }
  },
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
        report: { ...emptyReport }
      };
    }
  }
};
