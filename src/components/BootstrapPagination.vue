<template>
  <nav>
    <ul class="pagination">
      <li class="page-item" :class="{disabled: page_from === 1}" @click="onPrevButtonClick">
        <a class="page-link" href="#" tabindex="-1">Sebelum</a>
      </li>
      <li
        @click="$emit('go-to-page', page_from + n - 1)"
        class="page-item"
        :class="{active: (page_from + n - 1) === pagination.current_page }"
        v-for="n in (page_to - page_from + 1)"
        :key="n"
      >
        <a class="page-link">{{ page_from + n - 1 }}</a>
      </li>
      <li class="page-item" :class="{disabled: page_to === max_n_pages}" @click="onNextButtonClick">
        <a class="page-link" href="#">Sesudah</a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ["pagination", "n_max_buttons"],

  methods: {
    onNextButtonClick() {
      if (this.page_to === this.max_n_pages) {
        return;
      }
      this.$emit("go-to-page", this.page_to + 1);
    },

    onPrevButtonClick() {
      if (this.page_from === 1) {
        return;
      }
      this.$emit("go-to-page", this.page_from - 1);
    }
  },

  computed: {
    current_shaft() {
      return Math.ceil(this.pagination.current_page / this.n_max_buttons);
    },

    max_n_pages() {
      return Math.ceil(this.pagination.total / this.pagination.per_page);
    },

    page_from() {
      return (
        Math.floor((this.pagination.current_page - 1) / this.n_max_buttons) *
          this.n_max_buttons + 1
      );
    },

    page_to() {
      let to = this.current_shaft * this.n_max_buttons;
      if (to > this.max_n_pages) {
        return this.max_n_pages;
      }
      return to;
    }
  }
};
</script>