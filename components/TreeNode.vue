<template>
    <li>
      <div @click="toggleChildren">
        <span>{{ node.locale[locale]?.cg_name || node.locale[Object.keys(node.locale)[0]].cg_name }}</span>
        <span v-if="node.path_to_top.length > 0">({{ breadcrumbs }})</span>
      </div>
      <ul v-if="isOpen">
        <TreeNode
          v-for="child in node.childs"
          :key="child.id"
          :node="child"
          :locale="locale"
        />
      </ul>
    </li>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  
  const props = defineProps({
    node: Object,
    locale: String
  });
  
  const isOpen = ref(false);
  
  const toggleChildren = () => {
    isOpen.value = !isOpen.value;
  };
  
  const breadcrumbs = computed(() => {
    return props.node.path_to_top.map(id => {
      const parentNode = findNodeById(props.node, id);
      return parentNode.locale[props.locale]?.cg_name || parentNode.locale[Object.keys(parentNode.locale)[0]].cg_name;
    }).join(' -> ');
  });
  
  const findNodeById = (node, id) => {
    if (node.id === id) return node;
    for (const child of node.childs) {
      const found = findNodeById(child, id);
      if (found) return found;
    }
    return null;
  };
  </script>