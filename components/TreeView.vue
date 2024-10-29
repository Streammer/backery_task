<template>
    <div>
      <select v-model="selectedLocale">
        <option value="ru">Русский</option>
        <option value="en">English</option>
        <option value="fr">Français</option>
      </select>
  
      <div v-if="treeData">
        <ul>
          <TreeNode v-for="node in treeData.childs" :key="node.id" :node="node" :locale="selectedLocale" />
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  import { useTree } from '@/composables/useTree';
  import TreeNode from '@/components/TreeNode.vue';
  
  const { treeData, locale } = useTree();
  const selectedLocale = ref(locale.value);
  
  watch(selectedLocale, (newLocale) => {
    locale.value = newLocale;
  });
  </script>