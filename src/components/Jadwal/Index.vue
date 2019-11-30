<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Jadwal</h1>
            </div>
            <div class="col-2 content-right">
                <button class="btn btn-circle btn-blue" @click="openPopup('create')">
                    <i class="fa fa-lg fa-plus" />
                </button>
            </div>
        </div>
        <vuetable ref="vuetable"
			:api-mode="false"
            :fields="fields"
            :per-page="perPage"
            :data-manager="dataManager"
            pagination-path="pagination"
            @vuetable:pagination-data="onPaginationData"
                >
                    <div slot="actions" slot-scope="props">
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="onActionClicked('view-item', props.rowData)"
                        >
                            <i class="fa fa-lw fa-search-plus"></i>
                        </button>
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="openPopup('edit')"
                        >
                            <i class="fa fa-lw fa-pencil-alt"></i>
                        </button>
                        <button 
                            class="btn btn-small-circle btn-grey" 
                            @click="onActionClicked('delete-item', props.rowData)"
                        >
                            <i class="fa fa-lw fa-trash-alt"></i>
                        </button>
                    </div>
        </vuetable>
        <div style="padding-top:10px">
            <vuetable-pagination ref="pagination"
                :css="css.pagination"
                @vuetable-pagination:change-page="onChangePage"
            ></vuetable-pagination>
        </div>

        <div class="padding-20px"></div>

        <!-- Create/Edit form -->
        <div v-if="visiblePopup" class="app-popup app-popup-show">
            <div class="popup-content-small">
                <div class="popup-panel">
                    <div>
                        <h2 class="title">
                            <label v-if="typePopup === 'create'">
                                Tambah Jadwal
                            </label>
                            <label v-if="typePopup === 'edit'">
                                Edit Jadwal
                            </label>
                        </h2>
                    </div>
                    <div class="content-right">
                        <button class="btn btn-circle btn-grey" @click="openPopup()">
                            <i class="fa fa-lg fa-times" />
                        </button>
                    </div>
                </div>
                <div class="padding-15px">
                    <div class="col-1">
                        <div class="form-group">
                            <label>Pilih ruangan</label>
                            <select class="slc slc-sekunder">
                                <option>opsi 1</option>
                                <option>opsi 2</option>
                                <option>opsi 3</option>
                                <option>opsi 4</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Pilih pegawai</label>
                            <select class="slc slc-sekunder">
                                <option>opsi 1</option>
                                <option>opsi 2</option>
                                <option>opsi 3</option>
                                <option>opsi 4</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label>Shift</label>
                            <input type="text" class="txt txt-sekunder-color" />
                        </div>
                        <div class="form-group">
                            <label>Start time</label>
                            <input type="date" class="txt txt-sekunder-color" />
                        </div>
                        <div class="form-group">
                            <label>End time</label>
                            <input type="date" class="txt txt-sekunder-color" />
                        </div>
                    </div>
                </div>
                <div class="padding-15px content-right border-top">
                    <button type="button" class="btn btn-grey" @click="openPopup()">
                        Cancel
                    </button>
                    <button type="button" class="btn btn-blue">
                        Save
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vuetable from "vuetable-2";
import VuetablePagination from "vuetable-2/src/components/VuetablePagination";
import FieldsDef from "./FieldsDef.js";
import axios from "axios";
import _ from "lodash";

import TableCss from '../modules/TableCss'

export default {
    components: {
        Vuetable,
        VuetablePagination
    },

    data() {
        return {
            fields: FieldsDef,
            perPage: 7,
            css: TableCss,
            typePopup: '',
            visiblePopup: false,
            data: []
        };
    },

    watch: {
        data(newVal, oldVal) {
            this.$refs.vuetable.refresh();
        }
    },

    mounted() {
        axios.get("https://vuetable.ratiw.net/api/users").then(response => {
            this.data = response.data.data;
            console.log(data)
        });
    },

    methods: {
        openPopup(type) {
            this.visiblePopup = !this.visiblePopup
            this.typePopup = type
        },
        onPaginationData(paginationData) {
            this.$refs.pagination.setPaginationData(paginationData);
        },
        onChangePage(page) {
            this.$refs.vuetable.changePage(page);
        },
        dataManager(sortOrder, pagination) {
            if (this.data.length < 1) return;

            let local = this.data;

            // sortOrder can be empty, so we have to check for that as well
            if (sortOrder.length > 0) {
                console.log("orderBy:", sortOrder[0].sortField, sortOrder[0].direction);
                local = _.orderBy(
                local,
                sortOrder[0].sortField,
                sortOrder[0].direction
                );
            }

            pagination = this.$refs.vuetable.makePagination(
                local.length,
                this.perPage
            );
            console.log('pagination:', pagination)
            let from = pagination.from - 1;
            let to = from + this.perPage;

            return {
                pagination: pagination,
                data: _.slice(local, from, to)
            };
        },
        onActionClicked(action, data) {
            console.log("slot actions: on-click", data.name);
        }
    }
}
</script>
