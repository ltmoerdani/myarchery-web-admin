import { useFetcher } from "hooks/alt-fetcher";
import { EventsService } from "services";

import { datetime } from "utils";

function useSubmitRegistrationDates(eventId, formData) {
  const fetcher = useFetcher();

  const submit = (options = {}) => {
    // const submit = (options = {}) => {
    let payload = {
      event_id: eventId,
      default_datetime_start_register: formData.registrationDateStart
        ? datetime.formatServerDatetime(formData.registrationDateStart)
        : undefined,
      default_datetime_end_register: formData.registrationDateEnd
        ? datetime.formatServerDatetime(formData.registrationDateEnd)
        : undefined,
      schedule_start_event: datetime.formatServerDatetime(
        formData.eventDateStart
      ),
      schedule_end_event: datetime.formatServerDatetime(formData.eventDateEnd),
      is_active_config: 0,
      is_active_classification: formData.isActiveClassification,
      list_classification: [],
    };
    if (formData?.classification?.parentClassification?.childrens?.length) {
      const childrenData = [];
      formData?.classification?.parentClassification?.childrens?.map((val) => {
        const parent = {
          parent_classification_id:
            formData?.classification?.parentClassification.id,
          children_classification_id: val.id,
          archery_club_id: null,
          country_id: null,
          states_id: null,
          city_of_contry_id: null,
        };
        childrenData.push(parent);
      });
      payload.list_classification = childrenData;
    } else {
      const classifiactionData = {
        parent_classification_id:
          formData?.classification?.parentClassification.id,
        children_classification_id: null,
        archery_club_id: null,
        country_id: formData?.classification?.setting_country?.id ?? null,
        states_id:
          formData?.classification?.parentClassification?.id !== 4
            ? formData?.classification?.setting_province?.id
            : formData?.classification?.setting_city?.provinceId ?? null,
        city_of_contry_id: formData?.classification?.setting_city?.id ?? null,
      };
      payload.list_classification = [classifiactionData];
    }

    if (formData.isActive) {
      payload = {
        ...payload,
        is_active_config: 1,
        list_config: formData.configs?.map((config) => {
          const dateStart = datetime.formatServerDatetime(config.start);
          const dateEnd = datetime.formatServerDatetime(config.end);

          const configPayload = {
            config_type: config.team?.value,
            date_time_start_register_config: dateStart,
            date_time_end_register_config: dateEnd,
          };

          if (!config.isSpecialActive) {
            return {
              ...configPayload,
              is_have_special_category: 0,
            };
          }

          return {
            ...configPayload,
            is_have_special_category: 1,
            special_category: _makePayloadConfigCategories(config.categories),
          };
        }),
      };
    }
    const postFunction = () => EventsService.setConfigCategoryRegister(payload);
    fetcher.runAsync(postFunction, options);
  };

  return { ...fetcher, submit };
}

/* ======================== */
// utils

function _makePayloadConfigCategories(categories) {
  const payload = categories?.map((item) => {
    const payloadCategories = [];
    for (const pair of item?.categories) {
      for (const category of pair.categories) {
        payloadCategories.push({
          category_id: category.id,
        });
      }
    }

    const start = datetime.formatServerDatetime(item.start);
    const end = datetime.formatServerDatetime(item.end);

    return {
      date_time_start_register_special_category: start,
      date_time_end_register_special_category: end,
      list_category: payloadCategories,
    };
  });

  return payload || [];
}

export { useSubmitRegistrationDates };
