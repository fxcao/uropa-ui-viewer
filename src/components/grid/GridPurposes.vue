<template>
  <div v-if="current === 2" class="space-y-8 divide-y divide-gray-200">
    <div>
      <div>
        <UButton label="New purpose" :action-on-click="displayPurpose" :icon="mdiPlusCircle"/>
      </div>
      <div>
        <FormSinglePurpose v-if="purposeVisible" :purpose="purposeTemplate"/>
      </div>
      <div class="mt-8 flex flex-col">
        <div class="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300">
                <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Name</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Description</th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Legal basis type
                  </th>
                  <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Main</th>
                  <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 bg-white">
                <tr v-for="purpose in purposes" :key="purpose.name">
                  <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                    {{ purpose.name }}
                  </td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ purpose.description }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ purpose.legalBasis.type }}</td>
                  <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    <UIcon v-if="purpose.isMain" :path="mdiCheck"/>
                  </td>
                  <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                    <a href="#" class="text-indigo-600 hover:text-indigo-900"
                    >Edit<span class="sr-only">, {{  }}</span></a
                    >
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {useStore} from '@/store/stepper.js'
import {useStoreData} from "@/store/data.js"
import {useStoreForms} from '@/store/forms.js'
import {storeToRefs} from 'pinia'
import FormSinglePurpose from "@/components/form/purposes/FormPurpose.vue"
import UButton from "@/components/basic/UButton.vue"
import UIcon from "@/components/basic/UIcon.vue"
import {mdiCheck, mdiPlusCircle} from '@mdi/js'

const store = useStore()
const {current} = storeToRefs(store)
const {processingRecord: {purposes}, purposeTemplate} = useStoreData()

const storeForms = useStoreForms()
const {purposeVisible} = storeToRefs(storeForms)

const displayPurpose = async () => {
  storeForms.$patch({
    purposeVisible: !storeForms.purposeVisible
  })
}

</script>