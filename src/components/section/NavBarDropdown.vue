<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton
          class="inline-flex justify-center w-full text-sm font-medium text-gray-700">
        {{ label }}
        <UIcon :path="mdiIcon"/>
        <ChevronDownIcon class="-mr-1 ml-2 h-5 w-5" aria-hidden="true"/>
      </MenuButton>
    </div>

    <transition enter-active-class="transition ease-out duration-100" enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100" leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100" leave-to-class="transform opacity-0 scale-95">
      <MenuItems
          class="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div class="py-1">
          <MenuItem v-for="item in list" v-slot="{ active }">
            <a href="#"
               :class="[active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm']">{{
                item
              }}</a>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script setup>
import {Menu, MenuButton, MenuItem, MenuItems} from '@headlessui/vue'
import {ChevronDownIcon} from '@heroicons/vue/solid'
import UIcon from '@/components/basic/UIcon.vue'

const props = defineProps({
  label: {
    type: String,
    default: null
  },
  mdiIcon: {
    type: String,
    default: null
  },
  list: {
    type: Array,
    required: true
  }
})
</script>
