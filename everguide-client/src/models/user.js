export class UserformRequest{
  constructor(
    name, 
    year, 
    month,
    date,
    gender,
    region,
    single_household,
    has_chronic_disease, 
    is_disabled_or_single_parent_or_grandparent, 
    housing_type,
    is_low_income,
    is_basic_living_recipient,
    needs_medical_support
    ) {
    this.name = name;
    this.birth_year = birth_year;
    this.birth_month = birth_month;
    this.birth_date = birth_date;
    this.gender = gender;
    this.region = region;
    this.single_household = single_household;
    this.has_chronic_disease = has_chronic_disease;
    this.is_disabled_or_single_parent_or_grandparent = is_disabled_or_single_parent_or_grandparent;
    this.housing_type = housing_type;
    this.is_low_income = is_low_income;
    this.is_basic_living_recipient = is_basic_living_recipient;
    this.needs_medical_support = needs_medical_support;
    }
}

export class UserformResponse{
  constructor(success, message) {
    this.success = success;
    this.message = message;
  }
}