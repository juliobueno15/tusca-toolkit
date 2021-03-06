import * as api from '../../utils/api.js';


const setFetchedEvents = (response) => {
  return {
    type: 'SET_FETCHED_EVENTS',
    payload: response,
  }
}

const setRegisterReturnCode = (returnCode, pgCode) => {
  return {
    type: 'SET_REGISTER_RETURN_CODE',
    payload: {
      returnCode: returnCode,
      pgCode: pgCode
    }
  }
}

const setFetchedWards = (response) => {
  return {
    type: 'SET_FETCHED_WARDS',
    payload: response,
  } 
}

const unsetDBError = () => {
  return {
    type: 'UNSET_DB_ERROR'
  }
}


const setEventsDestroyed = () => {
	return {
		type: 'DESTROY_EVENTS'
	}
}

const setWardsDestroyed = () => {
  return {
    type: 'DESTROY_WARDS'
  }
}

const setRegisterPatientReturnCode = (returnCode, pgCode) => {
  return {
    type: 'SET_PATIENT_REGISTER_CODE',
    payload: {
      returnCode: returnCode,
      pgCode: pgCode
    }
  }
}
const setNurseData = (data) => {
  return {
    type: 'SET_ANALYTICS_DATA',
    payload: data 
  }
}

export const getNurseData = () => {
  return (dispatch) => {
    api.makeGetRequest('/api/v1/get_analytics').then((response) => {
      let data = response.data.data;
      dispatch(setNurseData(data));
    }, (error) => {
      console.log(error);
    })
  }
}

export const unsetError = () => {
  return (dispatch) => {
    dispatch(unsetDBError());
  }
}

export const destroyEvents = () => {
	return (dispatch) => {
		dispatch(setEventsDestroyed());
	}
}

export const destroyWards = () => {
  return (dispatch) => {
    dispatch(setWardsDestroyed());
  }
}

export const registerPatient = (cpf, name) => {
  return (dispatch) => {
    api.makePostRequest('/api/v1/insert_patient',
      {
        cpf: cpf,
        name: name
      }).then((response) => {
        console.log(response.data.success);
      dispatch(setRegisterPatientReturnCode(response.data.success, response.data.pgcode));
    }, (error) => {
      console.log(error);
    });
  }
}

export const fetchWards = () => {
  return (dispatch) => {
    api.makeGetRequest('/api/v1/search_wards').then((response) => {
      let data = response.data.data;
      dispatch(setFetchedWards(data));
    }, (error) => {
      console.log(error);
    })
  }
}

export const register = (cpf, id, nurse, companion, diagnostic, date) => {
  return (dispatch) => {
    api.makePostRequest('/api/v1/insert_wards',
      {
        cpf: cpf,
        id: id,
        nurse: nurse,
        companion: companion,
        diagnostic: diagnostic,
        date: date
      }).then((response) => {
      dispatch(setRegisterReturnCode(response.data.success, response.data.pgcode));
    }, (error) => {
      console.log(error);
    });
  }
}

export const fetchEvents = () => {
  return (dispatch) => {
    api.makeGetRequest('/api/v1/search_events').then((response) => {
    	let data = response.data.data;
      dispatch(setFetchedEvents(data));
    }, (error) => {
      console.log(error);
    });
  }
}
