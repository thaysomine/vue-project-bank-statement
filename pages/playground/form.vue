<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-card>
          <v-card-title>Form</v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12" sm="6">
                <f-form-input label="First Name" />
                </v-col>
                <v-col cols="12" sm="6">
                  <f-form-autocomplete label="First Name" />

                </v-col>
                <v-col cols="12" sm="6">
                  <f-form-date-picker label="First Name" />

                </v-col>
                <v-col cols="12" sm="6">
                  <f-form-file-upload label="First Name" />

                </v-col>
                <v-col cols="12" sm="6">
                  <f-form-image-upload label="First Name" />

                </v-col>
                <v-col cols="12" sm="6">
                  <f-form-input-and-text label="First Name" />

                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts" setup></script>

<style></style>
