import {get} from 'lodash'

export default {
    mounted() {
        this.fetchData()
    },

    data() {
        return {
            raw_url: null,
            list: [],
            pagination: null,
            sorted_by: null,
            sort_order: 'asc'
        }
    },

    methods: {
        fetchData() {
            axios
                .get(this.url)
                .then(response => {
                    let { data, ...pagination } = response.data
                    this.list = data
                    this.pagination = pagination
                })
        },

        updateSortedBy(field) {
            if (field !== this.sorted_by) {
                this.sort_order = 'asc'
            }
            else {
                if (this.sort_order === null) {
                    this.sort_order = 'asc'
                }
                else if (this.sort_order === 'asc') {
                    this.sort_order = 'desc'
                }
                else {
                    this.sorted_by = null
                    return
                }
            }

            this.sorted_by = field
        },

        onGotoPage(page) {
            this.pagination.current_page = page
            this.fetchData()
        }
    },

    computed: {
        url() {
            let page = get(this.pagination, 'current_page', 1)
            let sort_args = this.sorted_by ?
                `${this.sorted_by}|${this.sort_order}` :
                ''

            return `${this.raw_url}?page=${page}&sort=${sort_args}`
        },
    },

    watch: {
        sort_order() {
            this.fetchData()
        },

        sorted_by() {
            this.fetchData()
        }
    }
}