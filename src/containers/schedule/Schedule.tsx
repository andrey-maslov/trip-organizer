import React, { useCallback, useEffect, useState } from 'react';

import GSTC from 'gantt-schedule-timeline-calendar';
import { Plugin as TimelinePointer } from 'gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js';
import { Plugin as Selection } from 'gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js';
import { Plugin as ItemResizing } from 'gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js';
import { Plugin as ItemMovement } from 'gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js';

// Mock DB
import { itemsFromDB, columnsFromDB, rowsFromDB } from './data';

import 'gantt-schedule-timeline-calendar/dist/style.css';
import { Typography } from '@material-ui/core';

const GSTCID = GSTC.api.GSTCID;
const sourceID = GSTC.api.sourceID;
const date = GSTC.api.date;

const licenseKey = `====BEGIN LICENSE KEY====${process.env.REACT_APP_GSTC_KEY}====END LICENSE KEY====`;

// helper functions

/**
 * Convert data from array into GSTC object
 */
function fromArray(array: any) {
    const GSTCID = GSTC.api.GSTCID; // [IMPORTANT] every id must be wrapped by this function
    const resultObj: any = {};
    for (const item of array) {
        item.id = GSTCID(item.id);
        if ('rowId' in item) {
            item.rowId = GSTCID(item.rowId);
        }
        if ('parentId' in item) {
            item.parentId = GSTCID(item.parentId);
        }
        resultObj[item.id] = item;
    }
    return resultObj;
}

function Schedule() {
    let gstc: any;
    let state: any;
    let subs = [];
    let oldWrapper: any;

    const callback = useCallback(
        element => {
            if (element) {
                initializeGSTC(element);
            }
        },
        [itemsFromDB],
    );

    useEffect(() => {
        return () => {
            if (gstc) {
                gstc.destroy();
            }
        };
    });

    return (
        <div className="App">
            {/*<div className="toolbox">*/}
            {/*    <button onClick={updateFirstRow}>Update first row</button>*/}
            {/*    <button onClick={changeZoomLevel}>Change zoom level</button>*/}
            {/*</div>*/}
            <Typography variant="h4">SCHEDULE</Typography>
            {/*<div className="gstc-wrapper" ref={callback}/>*/}
        </div>
    );

    function eventClickHandler(event: any, data: any) {
        console.log(data);
        alert(`Event ${data.item.id} clicked!`);
    }

    function clickAction(element: any, data: any) {
        function onEventClick(event: any) {
            eventClickHandler(event, data);
        }

        element.addEventListener('click', onEventClick);
        return {
            update(element: any, newData: any) {
                data = newData;
            },
            destroy(element: any, data: any) {
                element.removeEventListener('click', onEventClick);
            },
        };
    }

    function addClassToItem(element: any, data: any) {
        console.log(element);
        element.classList.add('kjhkjhk');
    }

    // function updateFirstRow() {
    //     state.update(`config.list.rows.${GSTC.api.GSTCID('0')}`, (row: any) => {
    //         row.label = 'Changed dynamically';
    //         return row;
    //     });
    // }
    //
    // function changeZoomLevel() {
    //     state.update('config.chart.time.zoom', 21);
    // }

    // function onState(state: any) {
    //     state.update("config.chart.items.1", (item1: any) => {
    //         item1.label = "Gantt schedule timeline calendar";
    //         item1.time.end = item1.time.end + 2 * 24 * 60 * 60 * 1000;
    //         return item1;
    //     });
    //     subs.push(
    //         state.subscribe("config.chart.items", (items: any) => {
    //             // console.log("items changed", items);
    //         })
    //     );
    //     subs.push(
    //         state.subscribe("config.list.rows", (rows: any) => {
    //             // console.log("rows changed", rows);
    //         })
    //     );
    //     state.update('config.wrappers', (wrappers: any) => {
    //         oldWrapper = wrappers.ChartTimelineGridRowBlock;
    //         wrappers.ChartTimelineGridRowBlock = addClassWrapper;
    //         return wrappers;
    //     });
    // }

    function initializeGSTC(element: any) {
        /**
         * @type { import("gantt-schedule-timeline-calendar").Config }
         */
        const config: any = {
            licenseKey,
            plugins: [TimelinePointer(), Selection(), ItemResizing(), ItemMovement()],
            list: {
                columns: {
                    data: fromArray(columnsFromDB),
                },
                rows: fromArray(rowsFromDB),
            },
            chart: {
                items: fromArray(itemsFromDB),
            },
            actions: {
                'chart-timeline-items-row-item': [clickAction, addClassToItem],
            },
        };

        state = GSTC.api.stateFromConfig(config);
        state.update('config.chart', (chart: any) => {
            console.log(chart);
            return chart;
        });
        state.update('config.chart.items', (items: any) => {
            for (let key in items) {
                items[key].label = <div />;
            }
            return items;
            // return items.map((item: any) => item.label = '<div class="my-item">Item</div>',)
            // item1.label = "Gantt schedule timeline calendar";
            // item1.time.end = item1.time.end + 2 * 24 * 60 * 60 * 1000;
        });

        gstc = GSTC({
            element,
            state,
        });
    }
}

export default Schedule;
