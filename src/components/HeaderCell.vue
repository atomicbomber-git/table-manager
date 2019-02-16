<template>
    <th
        @click="$emit('update-sortedby', field)">
        <slot></slot>
        <i v-if="sorted_by === field" :class="iconClass"></i>
    </th>
</template>

<script>
export default {
    props: ['sorted_by', 'sort_order', 'field'],

    computed: {
        iconClass() {
            if (this.sort_order === 'asc') {
                return 'fa fa-chevron-up'
            }
            else {
                return 'fa fa-chevron-down'
            }
        }
    }
}
</script>
