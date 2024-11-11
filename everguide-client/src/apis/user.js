import { UserformRequest, UserformResponse} from '../models/user';
import axios from 'axios';

const PREFIX = '/user';

// UserformAPI 함수 (JavaScript)
export const UserformAPI = (data) => {
  const requestData = new UserformRequest(
    data.name,
    data.birthdate,
    data.region,
    data.single_household,
    data.has_chronic_disease,
    data.is_disabled_or_single_parent_or_grandparent,
    data.housing_type,
    data.is_low_income,
    data.is_basic_living_recipient,
    data.needs_medical_support
  );

  return axios.post(PREFIX + '/join', requestData).then(response => {
    return new UserformResponse(
      response.data.status,
      response.data.message,
      response.data.isSuccess,
      response.data.success,
      response.data.code,
      response.data.detail
    );
  });
};
