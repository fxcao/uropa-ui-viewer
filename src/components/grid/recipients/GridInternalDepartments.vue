<template>
  <div class="flex justify-center" v-if="ropa.recipients.internalDepartments.length === 0">
    <p id="empty-grid" class="form-error">You must have at least one internal department</p>
  </div>
  <UButton label="New internal department" v-on:click="createInternalDepartment" :icon="mdiPlusCircle"/>
  <div class=" py-5">
    <ul role="list" class="u-grid">
      <li v-for="(internalDepartment, index) in ropa.recipients.internalDepartments" :key="index"
          class="u-grid">
        <div class="relative px-4 py-5">
          <div class="flex items-center">
            <h3>
              <UIcon size="24" :path="mdiAccountGroup"/>
              {{ internalDepartment.name }}
            </h3>
          </div>
          <GridButtons @edit="editInternalDepartment(internalDepartment)" @delete="deleteInternalDepartment(index)"/>
        </div>
        <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
          <dl class="sm:divide-y sm:divide-gray-200">
            <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
              <dt class="flex items-center text-sm font-medium text-gray-500">
                <UIcon :path="mdiFormatListBulletedSquare"/>
                Disclosed
              </dt>
              <!-- FIXME should use class on the tag ul instead, but it doesn't seems to work -->
              <ul role="list">
                <li v-for="dataCategories in internalDepartment.dataCategoriesDisclosed"
                    class="flex items-center justify-between text-sm">
                  <div class="flex-1 flex items-center pb-2">
                    <span class="flex-1 truncate">- {{ dataCategories.name }}</span>
                  </div>
                </li>
              </ul>
            </div>
          </dl>
        </div>
      </li>
    </ul>
  </div>
  <div>
    <FormInternalDepartment :internal-department="state.internalDepartment" :edition="state.edition"/>
  </div>
</template>

<script setup>
import {reactive} from 'vue'
import {useStoreData} from '@/store/data.js'
import {useStoreDisplay} from '@/store/display.js'
import {storeToRefs} from 'pinia'
import UButton from '@/components/basic/UButton.vue'
import FormInternalDepartment from '@/components/form/recipients/FormInternalDepartment.vue'
import {mdiAccountGroup, mdiFormatListBulletedSquare, mdiPlusCircle} from '@mdi/js'
import InternalDepartmentTemplate from '@/data/template/recipients/InternalDepartmentTemplate.json'
import GridButtons from '@/components/grid/GridButtons.vue'
import UIcon from '@/components/basic/UIcon.vue'

const storeData = useStoreData()
const {ropa} = storeToRefs(storeData)
const state = reactive({internalDepartment: InternalDepartmentTemplate, edition: false})
const storeDisplay = useStoreDisplay()

function createInternalDepartment() {
  state.internalDepartment = JSON.parse(JSON.stringify(InternalDepartmentTemplate))
  state.edition = false
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: true
    }
  })
}

function editInternalDepartment(internalDepartment) {
  state.internalDepartment = internalDepartment
  state.edition = true
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: true
    }
  })
}

function deleteInternalDepartment(index) {
  storeData.$patch((state) => {
    state.ropa.recipients.internalDepartments.splice(index, 1)
  })
  storeDisplay.$patch({
    formsDisplayed: {
      internalDepartment: false
    }
  })
}

</script>
