<script setup lang="ts">
import { useReportStore } from '@/features/report/report.store';
import { storeToRefs } from 'pinia';
import { onMounted, ref, watch } from 'vue';
import { generateReport } from '@/features/report/utils';
import { c, t } from '@/localization';
import { PageLayout } from '@/layouts';
import {
  AppButton,
  AppCheckbox,
  AppSkeleton,
  AppSnackbar,
  AppTable,
  AppTextfield
} from '@/components';
import { debounce } from '@/shared/utils';

const reportStore = useReportStore();

const { report, isErrorLoadingReport, isReportReady, isReportLoading } = storeToRefs(reportStore);

const skeletonType = Array(6).fill('table-row').join(',');

const isCustomIncome = ref(false);

const customIncome = ref(0);

const debouncedIncomeInput = debounce(() => {
  reportStore.getCustomReport(customIncome.value);
}, 300);

watch(customIncome, () => {
  debouncedIncomeInput();
});

watch(isCustomIncome, (value) => {
  if (!value) {
    getReport();
  } else if (customIncome.value) {
    reportStore.getCustomReport(customIncome.value);
  }
});

function saveReport() {
  if (!report.value) return;

  generateReport(report.value);
}

function getReport() {
  const date = new Date();

  reportStore.getReport(date.getMonth(), date.getFullYear());
}

onMounted(() => {
  getReport();
});
</script>

<template>
  <PageLayout>
    <template #title>{{ t('report-page.title') }}</template>
    <template #subtitle>
      <AppCheckbox v-model="isCustomIncome" :label="t('report-page.custom-income')" hide-details />
      <AppTextfield
        v-if="isCustomIncome"
        v-model="customIncome"
        :label="t('report-page.custom-income')"
        type="number"
      />
    </template>

    <template v-if="isReportLoading">
      <AppSkeleton :type="skeletonType" />
    </template>
    <template v-if="isReportReady">
      <AppTable>
        <thead>
          <tr>
            <th colspan="2" class="text-left">
              {{ t('report-page.financial-section') }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ t('report-page.total-income') }}</td>
            <td>{{ c(report!.totalIncome) }}</td>
          </tr>
          <tr class="bg-red-accent-2">
            <td>{{ t('report-page.taxes') }}</td>
            <td>{{ c(report!.taxesToPay) }}</td>
          </tr>
          <tr class="bg-teal">
            <td>{{ t('report-page.revenue') }}</td>
            <td>{{ c(report!.totalIncome - report!.taxesToPay) }}</td>
          </tr>
          <tr>
            <td>{{ t('report-page.gifted') }}</td>
            <td>{{ c(report!.totalGifted) }}</td>
          </tr>
        </tbody>
      </AppTable>

      <AppTable>
        <thead>
          <tr>
            <th colspan="2" class="text-left">{{ t('report-page.operational') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{ t('report-page.orders-made') }}</td>
            <td>{{ report!.ordersMade }}</td>
          </tr>
          <tr>
            <td>{{ t('report-page.prints-done') }}</td>
            <td>{{ report!.printsDone }}</td>
          </tr>
          <tr>
            <td>{{ t('report-page.prints-won') }}</td>
            <td>{{ report!.printsWon }}</td>
          </tr>
        </tbody>
      </AppTable>
    </template>

    <template #actions>
      <AppButton
        @click="saveReport"
        :disabled="!isReportReady || isErrorLoadingReport"
        :loading="isReportLoading"
        icon="mdi-content-save"
      >
        {{ t('report-page.save') }}
      </AppButton>
    </template>
  </PageLayout>

  <AppSnackbar :model-value="isErrorLoadingReport" color="error" :timeout="2000">
    <div class="text-center">{{ t('report-page.error') }}</div>
  </AppSnackbar>
</template>

<style lang="scss" scoped>
tr {
  td {
    width: 50%;
  }
}
</style>
