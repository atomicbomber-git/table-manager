<template>
    <th
        @click="$emit('update-sortedby', field)"
        :class="{
            'text-success': (sorted_by === field) && (sort_order === 'asc'),
            'text-danger': (sorted_by === field) && (sort_order === 'desc')
        }">
        <slot></slot>
    </th>
</template>

<script>
export default {
    props: ['sorted_by', 'sort_order', 'field']
}
</script>
