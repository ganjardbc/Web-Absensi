export default {
    table: {
        tableWrapper: '',
        tableHeaderClass: 'fixed',
        tableBodyClass: 'vuetable-semantic-no-top fixed',
        tableClass: 'ui selectable unstackable celled table',
        loadingClass: 'loading',
        ascendingIcon: 'blue chevron up icon',
        descendingIcon: 'blue chevron down icon',
        ascendingClass: 'sorted-asc',
        descendingClass: 'sorted-desc',
        sortableIcon: 'grey sort icon',
        handleIcon: 'grey sidebar icon',
    },

    pagination: {
        wrapperClass: 'ui right floated pagination menu',
        activeClass: 'active large',
        disabledClass: 'disabled',
        pageClass: 'item',
        linkClass: 'icon item',
        paginationClass: 'ui bottom attached segment grid',
        paginationInfoClass: 'left floated left aligned six wide column',
        dropdownClass: 'ui search dropdown',
        icons: {
            first: 'fa fa-lw fa-angle-double-left',
            prev: 'fa fa-lw fa-angle-left',
            next: 'fa fa-lw fa-angle-right',
            last: 'fa fa-lw fa-angle-double-right',
        }
    },

    paginationInfo: {
        infoClass: 'left floated left aligned six wide column',
    },
}