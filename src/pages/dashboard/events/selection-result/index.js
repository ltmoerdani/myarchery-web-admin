import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import { useEventDetail } from "../scoring-qualification/hooks/event-detail";
import { useCategoryDetails } from "./hooks/category-details";

import { SpinnerDotBlock, ButtonOutlineBlue } from "components/ma";
import { toast } from "components/ma/processing-toast";
import { ToolbarFilter } from "components/ma/toolbar-filters";
import { ScoringPageWrapper } from "../components/scoring-page-wrapper";
import { SelectionKnobsView } from "../components/selection-knobs-view";
import { TableSelectionResult } from "./components/table-selection-result";

import IconDownload from "components/ma/icons/mono/download";

function PageEventSelectionResult() {
  const { event_id } = useParams();
  const eventId = parseInt(event_id);
  const { data: eventDetail } = useEventDetail(eventId);

  const {
    isInitialLoading: isInitialLoadingCategories,
    data: categoryDetails,
    isError: isErrorCategories,
    errors: errorsCategoryDetail,
  } = useCategoryDetails(eventId);

  const [activeCategory, setActiveCategory] = React.useState(null);
  const isSelectionType = eventDetail?.eventCompetition === "Selection";
  const pageProps = { pageTitle: "Hasil Akhir Seleksi", isSelectionType: isSelectionType };

  return (
    <ScoringPageWrapper {...pageProps}>
      <AsyncViewWrapper
        isLoading={isInitialLoadingCategories}
        isError={isErrorCategories}
        errors={errorsCategoryDetail}
      >
        <ToolbarFilter
          categories={categoryDetails}
          onChange={(data) => setActiveCategory(data.categoryDetail)}
          viewLeft={<SelectionKnobsView />}
          viewRight={
            <div>
              <ButtonOutlineBlue
                onClick={() => {
                  toast.loading("Sedang menyiapkan file unduhan...");
                  setTimeout(() => {
                    toast.dismiss();
                    toast.success("Memulai unduhan (coming soon)");
                  }, 1000);
                }}
              >
                <IconDownload size="16" /> Unduh Hasil
              </ButtonOutlineBlue>
            </div>
          }
        />

        <ViewWrapper>
          <TableSelectionResult key={activeCategory?.id} categoryDetailId={activeCategory?.id} />
        </ViewWrapper>
      </AsyncViewWrapper>
    </ScoringPageWrapper>
  );
}

function AsyncViewWrapper({ children, isLoading, isError, errors, errorLabel }) {
  if (isError) {
    return (
      <ViewWrapper>
        <p>
          {errorLabel || (
            <React.Fragment>
              Terdapat kendala dalam mengambil data. Lihat detail berikut untuk melihat informasi
              teknis lebih lanjut:
            </React.Fragment>
          )}
        </p>
        <pre>{JSON.stringify(errors)}</pre>
      </ViewWrapper>
    );
  }

  if (isLoading) {
    return <SpinnerDotBlock />;
  }

  return children;
}

/* =============================== */
// styles

const ViewWrapper = styled.div`
  padding: 0.5rem 1rem;
  background-color: #ffffff;

  > * + * {
    margin-top: 1.875rem;
  }
`;

export default PageEventSelectionResult;
