<template>
  <div
    class="bg-grey-2"
    style="border-radius: .5rem; padding: .5rem .5rem;"
  >
    <div class="listname">
      선택된 지역은
      <span v-if="nodes.length"> 총 {{ nodes.length }}개 지역, {{ selected.length }}개의 방송구간 입니다</span>
    </div>
    <div class="zones">
      <q-scroll-area :style="`height: ${height}px;`">
        <q-tree
          :nodes="nodes"
          node-key="_id"
        >
          <template #default-header="props">
            <div>
              <q-icon
                name="svguse:icons.svg#map1"
                size=".8rem"
              />
              <span class="q-ml-sm">{{ props.node.name }}</span>
            </div>
          </template>
        </q-tree>
      </q-scroll-area>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    nodes: Array,
    selected: Array,
    height: Number
  }
}
</script>
