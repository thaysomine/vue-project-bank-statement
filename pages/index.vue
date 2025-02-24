<script lang="ts" setup>
  definePageMeta({
    layout: 'default',
  })
  const files = ref<File[] | null>(null)
  const transactions = ref<Transaction[]>([])
  const categorizedTransactions = ref<{ [key: string]: Transaction[] }>({})
  const isLoading = ref(false)
  const showTransactions = ref(false);
  const userHeaders = [
  { key: "date", title: "Date", lg: 1 },
  { key: "description", title: "Description", lg: 4 },
  { key: "method", title: "Method", lg: 3 },
  { key: "value", title: "Value", lg: 2 },
  { key: "type", title: "Type", lg: 1 },
  { key: "category", title: "Category", lg: 1 },
]

  const {pdfToJson} = usePdfParser()

  async function parseFiles(files: File[] | File | null) {
    console.log(`files: ${files}; isArray: ${Array.isArray(files)}`)
    if(!files || Array.isArray(files)) return
    const file = files
    isLoading.value = true

    try {
      const parsedTransactions = await pdfToJson(file)
      transactions.value = parsedTransactions
      console.log('categorizedTransactions:', categorizedTransactions)
      categorizedTransactions.value = separateByCategory(parsedTransactions)
      console.log("Parsed Transactions:", categorizedTransactions)
      console.log("JSON convertido:", transactions)
    } catch (error) {
      console.error("Erro ao processar o PDF:", error)
    } finally {
      isLoading.value = false
    }
    console.log(files)
  }

  // ✅ Calcula o total gasto (somente despesas)
  const totalGasto = computed(() => {
    return transactions.value
      .filter(t => t.type === "Saída")
      .reduce((acc, t) => acc + t.value, 0)
  })

  // ✅ Obtém o mês e ano baseado na primeira transação
  // const monthYear = computed(() => {
  //   return transactions.value.length > 0
  //     ? parseDateToMonthYear(transactions.value[0].date)
  //     : ""
  // })

  // ✅ Função para calcular o total gasto por categoria
// const totalPorCategoria = (category: string) => {
//   return (categorizedTransactions.value[category] ?? [])
//     .flatMap((transaction: Transaction) => 
//       transaction.type === "group" ? transaction.items : transaction
//     )
//     .filter((t: TransactionItem) => t.type === "Saída")
//     .reduce((acc, t) => acc + t.value, 0)
// }

// function reset() {
//   transactions.value = [];
//   categorizedTransactions.value = [];
//   showTransactions.value = false;
// }
</script>

<!-- <template>
  <div class="d-flex align-center justify-center h-100 position-relative">
    <div>
      <v-row justify="center">
        <v-col cols="12" class="mt-5 font-weight-bold text-h4 text-center filter-shadow text-grey-darken-4">
            <v-file-input
            v-model="files"
            @update:model-value="parseFiles"
            label="File input"></v-file-input>
        </v-col>
      </v-row>
    </div>

    <f-col-list title="Transactions" :cols="userHeaders" :rows="transactions">
          <template #date="{ row }">
            <div class="d-flex align-center">
              <p class="ml-3 font-weight-bold text-h6">
                {{ row.date }}
              </p>
            </div>
          </template>
          <template #description="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.description }}
              </p>
          </template>
          <template #type="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.type }}
              </p>
          </template>
          <template #value="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.value }}
              </p>
          </template>
          <template #type="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.type }}
              </p>
          </template>
          <template #category="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.category }}
              </p>
          </template>
        </f-col-list>
  </div>
</template> -->

<template>
  <!-- <TransactionsHeader v-if="showTransactions" :transactions="transactions" @reset="reset" />
  <FileUpload :isLoading="isLoading" @file-selected="parseFiles" />
  <TransactionList v-if="transactions.length" :categorizedTransactions="categorizedTransactions" /> -->
  
  <div class="d-flex align-center justify-center h-100 position-relative flex-column">
    <template v-if="transactions.length === 0">
      <h1 class="title">Organize your expenses in a simple way</h1>
      <div>
        <v-row justify="center">
          <v-col cols="12" class="mt-5 font-weight-bold text-h4 text-center filter-shadow text-grey-darken-4">
            <v-file-input v-model="files" @update:model-value="parseFiles" label="File input"></v-file-input>
          </v-col>
        </v-row>
      </div>
      <p class="subtitle">Drag and drop or click to upload your bank statement</p>
    </template>

    <template v-else>
      <v-app-bar elevation="2">
        <v-btn icon @click="transactions = []">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-spacer />
        <div class="header-info">
          <p class="header-text">{{ 'DEZ' }}</p>
          <p class="header-amount">Total: R$ {{ totalGasto.toFixed(2) }}</p>
        </div>
      </v-app-bar>
       <v-container>
        <v-expansion-panels variant="accordion">
          <v-expansion-panel v-for="(transactions, category) in categorizedTransactions" :key="category">
            <v-expansion-panel-title>
              <div class="d-flex justify-space-between w-100">
                <span class="font-weight-bold">{{ category }}</span>
                <!-- <span class="text-red">Total - R$ {{ totalPorCategoria(category.toString()).toFixed(2) }}</span> -->
                <span class="text-red">Total - R$</span>
              </div>
            </v-expansion-panel-title>

            <v-expansion-panel-text>
              <f-col-list title="Transactions" :cols="userHeaders" :rows="transactions" density="compact"> 
                <template #date="{ row }">
                  <div class="d-flex justify-center flex-column">
                    <p class="ml-3 font-weight-bold text-h6">{{ parseDateRelative(row.date) }}</p>
                    <p class="ml-3 font-weight-bold text-h6 text-medium-emphasis text-caption">{{ parseDate(row.date) }}</p>
                  </div>
                </template>
                <template #description="{ row }">
                  <p class="ml-3 font-weight-bold text-h6">{{ row.description }}</p>
                </template>
                <template #method="{ row }">
                  <p class="ml-3 font-weight-bold text-h6">{{ row.method }}</p>
                </template>
                <template #value="{ row }">
                  <p class="ml-3 font-weight-bold text-h6">R$ {{ row.value.toFixed(2) }}</p>
                </template>
                <template #type="{ row }">
                  <p class="ml-3 font-weight-bold text-h6">{{ row.type }}</p>
                </template>
                <template #category="{ row }">
                  <p class="ml-3 font-weight-bold text-h6">{{ row.category }}</p>
                </template>
              </f-col-list>
            </v-expansion-panel-text>
          </v-expansion-panel>

        </v-expansion-panels>
       </v-container>
    </template>
  </div>
</template>


<style lang="scss" scoped>
.filter-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}

.title {
  font-family: 'Inter', sans-serif;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}

.subtitle {
  font-family: 'Inter', sans-serif;
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