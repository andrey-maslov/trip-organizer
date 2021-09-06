import GSTC from 'gantt-schedule-timeline-calendar';
const date = GSTC.api.date;

export const rowsFromDB = [
    {
        id: '1',
        label: 'Railway',
    },
    {
        id: '2',
        label: 'Airbus',
    },
];

export const itemsFromDB = [
    {
        id: '1',
        label: 'Item 1',
        rowId: '1',
        time: {
            start: date('2020-01-01').startOf('day').valueOf(),
            end: date('2020-01-02').endOf('day').valueOf(),
        },
    },
    {
        id: '2',
        label: 'Item 2',
        rowId: '1',
        time: {
            start: date('2020-02-01').startOf('day').valueOf(),
            end: date('2020-02-02').endOf('day').valueOf(),
        },
    },
    {
        id: '3',
        label: 'Item 3',
        rowId: '2',
        time: {
            start: date('2020-01-15').startOf('day').valueOf(),
            end: date('2020-01-20').endOf('day').valueOf(),
        },
    },
];

export const columnsFromDB = [
    {
        id: 'id',
        label: 'ID',
        data: ({ row }: any) => GSTC.api.sourceID(row.id), // show original id (not internal GSTCID)
        sortable: ({ row }: any) => Number(GSTC.api.sourceID(row.id)), // sort by id converted to number
        width: 80,
        header: {
            content: 'ID',
        },
    },
    {
        id: 'label',
        data: 'label',
        sortable: 'label',
        isHTML: false,
        width: 230,
        header: {
            content: 'Transport',
        },
    },
];
