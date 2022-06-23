import { useFetcher } from "utils/hooks/alt-fetcher";
import { DosService } from "services";

import { urlUtil } from "utils";

function useSessionDownloadTwo(eventCategoryId) {
  const fetcher = useFetcher();

  const handleDownloadSessionTwo = async ({ onSuccess: consumerSuccessHandler }) => {
    if (!eventCategoryId) {
      return;
    }

    const queryString = { event_category_id: eventCategoryId, session: 2 };
    const getFunction = () => {
      return DosService.getQualificationDownloadUrl(queryString);
    };
    const onSuccess = (data) => {
      consumerSuccessHandler?.();
      const downloadUrl = _handleURLFromResponse(data);
      urlUtil.openUrlOnNewTab(downloadUrl);
    };

    fetcher.runAsync(getFunction, { onSuccess });
  };

  return { ...fetcher, handleDownloadSessionTwo };
}

// utils
function _handleURLFromResponse(url) {
  const API_URL = process.env.REACT_APP_API_URL || "https://api-staging.myarchery.id";
  const segments = url.split("/");
  const assetSegmentIndex = segments.findIndex((segment) => segment === "storage");
  const downloadUrl = API_URL + "/" + segments.slice(assetSegmentIndex).join("/");
  return downloadUrl;
}

export { useSessionDownloadTwo };
