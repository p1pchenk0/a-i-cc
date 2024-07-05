import axios from 'axios';
import type { RawReport } from '@/features/report/types';

export const reportService = {
  async getReport(month: number, year: number): Promise<RawReport> {
    try {
      const result = await axios.get<RawReport>('http://127.0.0.1:3000/report', {
        params: {
          month,
          year
        }
      });

      return result.data;
    } catch (err) {
      return {
        taxesToPay: 0,
        ordersMade: 0,
        printsDone: 0,
        printsWon: 0,
        totalIncome: 0,
        totalGifted: 0
      };
    }
  }
};
