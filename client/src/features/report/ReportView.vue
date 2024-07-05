<script setup lang="ts">
import PageLayout from '@/layouts/PageLayout.vue';
import { useReportStore } from '@/features/report/report.store';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';
import { convertToPrice } from '@/shared/utils';
import { generateReport } from '@/features/report/utils';
import AppButton from '@/components/AppButton.vue';

const reportStore = useReportStore();

const { report, isErrorLoadingReport, isReportReady, isReportLoading } = storeToRefs(reportStore);

const skeletonType = Array(6).fill('table-row').join(',');

function saveReport() {
  if (!report.value) return;

  generateReport(report.value);
}

onMounted(() => {
  const date = new Date();

  reportStore.getReport(date.getMonth(), date.getFullYear());
});
</script>

<template>
  <PageLayout>
    <template #title> Monthly report </template>

    <template v-if="isReportLoading">
      <v-skeleton-loader :type="skeletonType"></v-skeleton-loader>
    </template>
    <template v-if="isReportReady">
      <v-table theme="dark">
        <thead>
          <tr>
            <th colspan="2" class="text-left">Financial</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total income</td>
            <td>{{ convertToPrice(report!.totalIncome) }}</td>
          </tr>
          <tr class="bg-red-accent-2">
            <td>Taxes to pay</td>
            <td>{{ convertToPrice(report!.taxesToPay) }}</td>
          </tr>
          <tr class="bg-teal">
            <td>Revenue</td>
            <td>{{ convertToPrice(report!.totalIncome - report!.taxesToPay) }}</td>
          </tr>
          <tr>
            <td>Total gifted in lottery</td>
            <td>{{ convertToPrice(report!.totalGifted) }}</td>
          </tr>
        </tbody>
      </v-table>

      <v-table theme="dark">
        <thead>
          <tr>
            <th colspan="2" class="text-left">Operational</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Orders made</td>
            <td>{{ report!.ordersMade }}</td>
          </tr>
          <tr>
            <td>Prints done</td>
            <td>{{ report!.printsDone }}</td>
          </tr>
          <tr>
            <td>Prints won</td>
            <td>{{ report!.printsWon }}</td>
          </tr>
        </tbody>
      </v-table>
    </template>

    <template #actions>
      <AppButton
        @click="saveReport"
        :disabled="!isReportReady || isErrorLoadingReport"
        :loading="isReportLoading"
        icon="mdi-content-save"
      >
        Save report
      </AppButton>
    </template>
  </PageLayout>

  <v-snackbar :model-value="isErrorLoadingReport" color="error" :timeout="2000">
    <div class="text-center">Error loading report</div>
  </v-snackbar>
</template>

<style scoped lang="scss"></style>
