import { useParams } from "react-router-dom";
import { useFetcher } from "utils/hooks/alt-fetcher";
import { EliminationService } from "services";

function useEliminationBracketTemplate(categoryDetailId, countNumber) {
  const { event_id } = useParams();
  const fetcher = useFetcher();

  const fetchEliminationTemplate = ({ onSuccess, onError } = {}) => {
    const getFunction = () => {
      return EliminationService.getEventEliminationTemplate({
        event_id: event_id,
        match_type: 1, // tipe "A-Z", hard coded untuk sekarang
        // gender: gender.id,
        event_category_id: categoryDetailId,
        elimination_member_count: countNumber,
      });
    };

    fetcher.runAsync(getFunction, {
      onSuccess: onSuccess,
      onError: onError,
    });
  };

  return { ...fetcher, fetchEliminationTemplate };
}

export { useEliminationBracketTemplate };
