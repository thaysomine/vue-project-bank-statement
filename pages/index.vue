<script lang="ts" setup>
  definePageMeta({
    layout: 'default',
  })
  const files = ref<File[] | null>(null)
  const transactions = ref<Transaction[]>([])
  const categorizedTransactions = ref<{ [key: string]: Transaction[] }>({})
  const userHeaders = [
  { key: "date", title: "Date", lg: 2 },
  { key: "description", title: "Description", lg: 2 },
  { key: "type", title: "Type", lg: 2 },
  { key: "value", title: "Value", lg: 2 },
  { key: "movement", title: "Movement", lg: 2 },
  { key: "category", title: "Category", lg: 2 },
]

  const {pdfToJson} = usePdfParser()

  async function parseFiles(files: File[] | File | null) {
    console.log(`files: ${files}; isArray: ${Array.isArray(files)}`)
    if(!files || Array.isArray(files)) return
    const file = files

    try {
      const parsedTransactions = await pdfToJson(file)
      transactions.value = parsedTransactions
      categorizedTransactions.value = separateByCategory(parsedTransactions)
      console.log("Parsed Transactions:", categorizedTransactions)
      console.log("JSON convertido:", transactions)
    } catch (error) {
      console.error("Erro ao processar o PDF:", error)
    }
    console.log(files)
  }
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
          <template #movement="{ row }">
            <p class="ml-3 font-weight-bold text-h6">
                {{ row.movement }}
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
  <div class="d-flex align-center justify-center h-100 position-relative flex-column">
    <div>
      <v-row justify="center">
        <v-col cols="12" class="mt-5 font-weight-bold text-h4 text-center filter-shadow text-grey-darken-4">
          <v-file-input v-model="files" @update:model-value="parseFiles" label="File input"></v-file-input>
        </v-col>
      </v-row>
    </div>

    <!-- Iterar sobre as categorias -->
    <div v-for="(transactions, category) in categorizedTransactions" :key="category || 'default'" class="flex-grow-1">
      <h2 class="text-primary text-center mt-4">{{ category }}</h2>

      <f-col-list title="Transactions" :cols="userHeaders" :rows="transactions" dense> 
        <template #date="{ row }">
          <div class="d-flex justify-center flex-column">
            <p class="ml-3 font-weight-bold text-h6">{{ parseDateRelative(row.date) }}</p>
            <p class="ml-3 font-weight-bold text-h6 text-medium-emphasis text-caption">{{ parseDate(row.date) }}</p>
          </div>
        </template>
        <template #description="{ row }">
          <p class="ml-3 font-weight-bold text-h6">{{ row.description }}</p>
        </template>
        <template #type="{ row }">
          <p class="ml-3 font-weight-bold text-h6">{{ row.type }}</p>
        </template>
        <template #value="{ row }">
          <p class="ml-3 font-weight-bold text-h6">{{ row.value }}</p>
        </template>
        <template #movement="{ row }">
          <p class="ml-3 font-weight-bold text-h6">{{ row.movement }}</p>
        </template>
        <template #category="{ row }">
          <p class="ml-3 font-weight-bold text-h6">{{ row.category }}</p>
        </template>
      </f-col-list>
    </div>
    <!-- <div v-for="(transactions, category) in categorizedTransactions" :key="category">
      <h2>{{ category }}</h2>
      <ul>
        <li v-for="transaction in transactions" :key="transaction.date">
          {{ transaction.description }} - R$ {{ transaction.value }}
        </li>
      </ul>
    </div> -->
  </div>
</template>


<style lang="scss" scoped>
.filter-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}
</style>