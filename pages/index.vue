<script lang="ts" setup>
import { usePdfParser } from '~/composables/usePdfParser'
  definePageMeta({
    layout: 'default',
  })
  const files = ref<File[] | null>(null)
  const {pdfToJson} = usePdfParser()

  async function parseFiles(files: File[] | File | null) {
    console.log(`files: ${files}; isArray: ${Array.isArray(files)}`)
    if(!files || Array.isArray(files)) return
    const file = files

    try {
      const transactions = await pdfToJson(file)
      console.log("JSON convertido:", transactions)
    } catch (error) {
      console.error("Erro ao processar o PDF:", error)
    }
    console.log(files)
  }
</script>

<template>
  <div class="d-flex align-center justify-center h-100 position-relative">
    <div>
      <v-row justify="center">

        <v-col cols="12" class="mt-5 font-weight-bold text-h4 text-center filter-shadow text-grey-darken-4">
            <v-file-input
            v-model="files"
            @update:model-value="parseFiles"
            label="File input"></v-file-input>
        </v-col>
        <v-col cols="12" class=" text-center filter-shadow text-grey-darken-3">
          Get started by selecting a community, and plan.
        </v-col>
        <v-col cols="12" class="mt-5 text-center">
          <v-btn color="primary" large href="/builder/community/ext" size="large">
            Select a Community
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.filter-shadow {
  filter: drop-shadow(0px 2px 2px rgba(0, 0, 0, 0.25));
}
</style>