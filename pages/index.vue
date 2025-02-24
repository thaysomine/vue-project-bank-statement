<script lang="ts" setup>
definePageMeta({
  layout: "default",
});
const files = ref<File | null>(null);
const transactions = ref<Transaction[]>([]);
const categorizedTransactions = ref<Transaction[]>([]);
const isLoading = ref(false);
const showTransactions = ref(false);
const userHeaders = [
  { key: "date", title: "Date", lg: 1 },
  { key: "description", title: "Description", lg: 4 },
  { key: "method", title: "Method", lg: 3 },
  { key: "value", title: "Value", lg: 2 },
  { key: "type", title: "Type", lg: 1 },
  { key: "category", title: "Category", lg: 1 },
];

const { pdfToJson } = usePdfParser();

async function parseFiles(files: File[] | File | null | undefined) {
  console.log(`files: ${files}; isArray: ${Array.isArray(files)}`);
  if (!files || Array.isArray(files)) return;
  const file = files;
  isLoading.value = true;

  try {
    const parsedTransactions = await pdfToJson(file);
    transactions.value = parsedTransactions;
    categorizedTransactions.value = separateByCategory(parsedTransactions);
  } catch (error) {
    console.error("Erro ao processar o PDF:", error);
  } finally {
    isLoading.value = false;
  }
  console.log(files);
}

// ✅ Calcula o total gasto (somente despesas)
const totalSpent = computed(() => {
  return transactions.value.reduce((acc, t) => acc + t.value, 0);
});
</script>

<template>
  <!-- <TransactionsHeader v-if="showTransactions" :transactions="transactions" @reset="reset" />
  <FileUpload :isLoading="isLoading" @file-selected="parseFiles" />
  <TransactionList v-if="transactions.length" :categorizedTransactions="categorizedTransactions" /> -->
  <v-app-bar elevation="2" app permanent>
    <v-btn icon @click="transactions = []">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer />
    <div class="header-info">
      <p class="header-text">{{ "DEZ" }}</p>
      <p class="header-amount">Total: R$ {{ totalSpent.toFixed(2) }}</p>
    </div>
  </v-app-bar>
  <template v-if="transactions.length === 0">
    <div class="d-flex align-center justify-center h-100 position-relative flex-column">
      <h1 class="title">Organize your expenses in a simple way</h1>
      <f-form-image-upload class="ar-1 w-25" height="auto" squared v-model="files" @update:model-value="parseFiles" label="File input"></f-form-image-upload>
      <p class="subtitle">Drag and drop or click to upload your bank statement</p>
    </div>
  </template>

  <template v-else>
    <v-main>
      <v-container>
        <v-list>
          <transaction-list :transactions="categorizedTransactions"></transaction-list>
        </v-list>
      </v-container>
    </v-main>
  </template>
</template>

<style lang="scss" scoped>
.filter-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}

.title {
  font-family: "Inter", sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-family: "Inter", sans-serif;
  font-size: 16px;
  text-align: center;
  color: #666;
  margin-top: 10px;
}

/* ✅ Estilos do Header */
.v-app-bar {
  display: flex;
  align-items: center;
  padding: 10px 20px;
}

.header-info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
}

.header-text {
  font-size: 18px;
  font-weight: bold;
}

.header-amount {
  font-size: 20px;
  font-weight: bold;
  color: #ff5252;
}
</style>
