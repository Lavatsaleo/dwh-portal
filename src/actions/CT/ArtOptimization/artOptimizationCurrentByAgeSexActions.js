import moment from 'moment';
import * as actionTypes from '../../types';
import { getAll } from '../../../views/Shared/Api';
import { CACHING } from '../../../constants';

export const loadArtOptimizationCurrentByAgeSex = () => async (dispatch, getState) => {
    if (getState().filters.noCache === true) {
        await dispatch(fetchArtOptimizationCurrentByAgeSex());
    } else {
        const diffInMinutes = moment().diff(
            moment(getState().artOptimizationCurrentByAgeSex.lastFetch),
            'minutes'
        );
        if (getState().ui.ctTab !== 'txOpt') {
            return;
        }
        else if ((diffInMinutes < CACHING.LONG) && getState().filters.filtered === false) {
            return;
        } else {
            await dispatch(fetchArtOptimizationCurrentByAgeSex());
        }
    }
};

export const fetchArtOptimizationCurrentByAgeSex = () => async (dispatch, getState) => {
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_AGE_SEX_REQUEST });
    const params = {
        county: getState().filters.counties,
        subCounty: getState().filters.subCounties,
        facility: getState().filters.facilities,
        partner: getState().filters.partners,
        agency: getState().filters.agencies,
        project: getState().filters.projects,
        gender: getState().filters.genders,
        datimAgeGroup: getState().filters.datimAgeGroups,
        latestPregnancy: getState().filters.latestPregnancies,
        populationType: getState().filters.populationTypes,
    };
    const response = await getAll('care-treatment/getArtOptimizationCurrentByAgeSex', params);
    dispatch({ type: actionTypes.CT_ART_OPTIMIZATION_CURRENT_BY_AGE_SEX_FETCH, payload: { filtered: getState().filters.filtered, list: response }});
};
