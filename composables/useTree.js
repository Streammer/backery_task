import { ref, watch } from 'vue';
import { useFetch } from '#app';

export const useTree = () => {
  const treeData = ref(null);
  const locale = ref('ru'); // Установите язык по умолчанию

  const loadTreeData = async () => {
    const { data } = await useFetch('/api/tree');
    treeData.value = data.value;
  };

  loadTreeData();

  watch(locale, () => {
    loadTreeData(); // Перезагрузить данные при изменении языка
  });

  return {
    treeData,
    locale,
  };
};