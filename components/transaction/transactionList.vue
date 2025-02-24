<script setup>
defineProps({
  categorizedTransactions: Object,
  userHeaders: Array,
});

// ✅ Calcula o total gasto por categoria
const totalPorCategoria = (category, transactions) => {
  return transactions.filter(t => t.movement === "Saída").reduce((acc, t) => acc + t.value, 0);
};
</script>

<template>
  <v-expansion-panels variant="accordion">
    <v-expansion-panel v-for="(transactions, category) in categorizedTransactions" :key="category">
      <v-expansion-panel-title>
        <div class="d-flex justify-space-between w-100">
          <span class="font-weight-bold">{{ category }}</span>
          <span class="text-red">Total - R$ {{ totalPorCategoria(category, transactions).toFixed(2) }}</span>
        </div>
      </v-expansion-panel-title>

      <v-expansion-panel-text>
        <f-col-list :title="category" :cols="userHeaders" :rows="transactions" dense>
          <template #date="{ row }">
            <div class="d-flex justify-center flex-column">
              <p class="ml-3 font-weight-bold text-h6">{{ parseDateRelative(row.date) }}</p>
              <p class="ml-3 font-weight-bold text-h6 text-medium-emphasis text-caption">{{ parseDate(row.date) }}</p>
            </div>
          </template>
          <template #description="{ row }">
            <p class="ml-3 font-weight-bold text-h6">{{ row.description }}</p>
          </template>
          <template #value="{ row }">
            <p class="ml-3 font-weight-bold text-h6">R$ {{ row.value.toFixed(2) }}</p>
          </template>
        </f-col-list>
      </v-expansion-panel-text>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
