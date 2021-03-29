import { createSelector } from 'reselect';

const listUnfiltered = state => state.newOnArtTrends.listUnfiltered;
const listFiltered = state => state.newOnArtTrends.listFiltered;
const filtered = state => state.filters.filtered;

export const getNewOnArtTrends = createSelector(
    [listUnfiltered, listFiltered, filtered],
    (listUnfiltered, listFiltered, filtered) => {
        const list = filtered ? listFiltered : listUnfiltered;
        const monthNames = {
            1: "January", 2: "February", 3: "March", 4: "April", 5: "May", 6: "June",
            7: "July", 8:"August", 9: "September", 10: "October", 11: "November", 12: "December"
        };
        let months = [];
        let txNew = [];

        for(let i = 0; i < list.length; i++) {
            const selectedArr = list.filter(obj => obj.month === list[i].month && obj.year === list[i].year);
            if (selectedArr.length > 0 && months.indexOf(monthNames[list[i].month] + ' ' + list[i].year.toString()) === -1) {
                let totalTxNew = 0;
                let femaleVal = 0;
                let maleVal = 0;
                for (const selectedArrElement of selectedArr) {
                    if (months.indexOf(monthNames[selectedArrElement.month] + ' ' + selectedArrElement.year.toString()) === -1) {
                        months.push(monthNames[selectedArrElement.month] + ' ' + selectedArrElement.year.toString());
                    }
                    totalTxNew = totalTxNew + parseInt(selectedArrElement.txNew, 10);
                    if (selectedArrElement.gender === "Female") {
                        femaleVal = (parseInt(selectedArrElement.txNew, 10));
                    }

                    if (selectedArrElement.gender === "Male") {
                        maleVal  = (parseInt(selectedArrElement.txNew, 10));
                    }
                }
                txNew.push(
                    {
                        y: totalTxNew,
                        text: "<b>Female: </b>" + femaleVal + ", <b>Male: </b>" + maleVal
                    });
            }
        }

        months = months.slice(Math.max(months.length - 12, 0));
        txNew = txNew.slice(Math.max(txNew.length - 12, 0));

        return { months, txNew };
    }
);
