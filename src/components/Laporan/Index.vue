<template>
    <div>
        <div class="grid grid-2x margin-bottom-10px">
            <div class="col-1">
                <h1>Laporan</h1>
            </div>
            <div class="col-2 content-right"></div>
        </div>

        <div class="display-flex-normal">
            <div class="form-group">
                <label>Pilih ruangan</label>
                <select class="slc slc-sekunder">
                    <option>opsi 1</option>
                    <option>opsi 2</option>
                    <option>opsi 3</option>
                    <option>opsi 4</option>
                </select>
            </div>
            <div class="form-group margin-left-15px margin-right-15px">
                <label>Dari tanggal</label>
                <input type="date" class="txt txt-sekunder-color" />
            </div>
            <div class="form-group">
                <label>Sampai tanggal</label>
                <input type="date" class="txt txt-sekunder-color" />
            </div>
        </div>

        <div class="padding-15px content-right">
            <button type="button" class="btn btn-blue">
                Print
            </button>
            <button type="button" class="btn btn-blue">
                Download
            </button>
        </div>

        <div class="padding-20px"></div>
    </div>
</template>

<script>
export default {
    components: {},
    data() {
        return {}
    },
}
</script>
