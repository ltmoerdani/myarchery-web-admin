import * as React from "react";
import styled from "styled-components";

import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from "reactstrap";
// import { Button } from "components/ma";

// import IconDownload from "components/ma/icons/mono/download";
import IconMoreVertical from "components/ma/icons/fill/more-vertical";
import IconTrash from "components/ma/icons/mono/trash";
import IconEdit from "components/ma/icons/mono/eye";
import IconEyeStrip from "components/ma/icons/mono/eye-strip";
import { AlertConfirmAction, AlertSubmitError, LoadingScreen } from "components/ma";

import { useSubmitPublish } from "../events/new/hooks/submit-publish";

import imgIllustration from "assets/images/Illustration.png";
import { AlertSuccess } from "../class-categories/components/alert-success";
import { useDeleteEvent } from "./submit-event-remove";

function ButtonMoreMenu({ event, fetchEventDetail }) {
  const [isOpen, setOpen] = React.useState(false);
  const [isConfirm, setConfirm] = React.useState(false);
  const [isConfirmDelete, setConfirmDelete] = React.useState(false);
  const [isSuccess, setSucces] = React.useState(false);

  const {
    sendPublish,
    isLoading: isLoadingPublish,
    isError: isErrorPublish,
    errors: errorsPublish,
  } = useSubmitPublish(event);

  const {
    deleteEvent,
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    errors: errorsDelete,
  } = useDeleteEvent(event?.id);

  return (
    <React.Fragment>
      <LoadingScreen loading={isLoadingPublish || isLoadingDelete} />
      <AlertSubmitError isError={isErrorPublish} errors={errorsPublish} />
      <AlertSubmitError isError={isErrorDelete} errors={errorsDelete} />
      <AlertConfirmAction
        shouldConfirm={isConfirm}
        onClose={() => setConfirm(false)}
        onConfirm={() => {
          sendPublish(event?.publicInformation.eventStatus ? 0 : 1, {
            onSuccess() {
              setSucces(true);
              fetchEventDetail();
            },
          });
        }}
        labelConfirm={
          event?.publicInformation.eventStatus ? "Ya, jadikan draft" : "Ya, publikasikan event"
        }
        labelCancel="Tidak, kembali"
      >
        <img src={imgIllustration} alt="gambar" width="250px" style={{ marginBottom: "30px" }} />
        <h5>
          Apakah anda yakin Event Ini Akan
          {event?.publicInformation.eventStatus ? " dijadikan Draft?" : " dipublikasikan?"}
        </h5>
        <p>
          Event akan
          {event?.publicInformation.eventStatus
            ? "dijadikan draft, Anda masih dapat mempublikasikan event ini nanti"
            : "dipublikasikan"}
        </p>
      </AlertConfirmAction>

      <AlertConfirmAction
        shouldConfirm={isConfirmDelete}
        onClose={() => setConfirmDelete(false)}
        onConfirm={() => {
          deleteEvent({
            onSuccess() {
              setSucces(true);
              fetchEventDetail();
            },
          });
        }}
        labelConfirm="Ya, hapus event ini"
        labelCancel="Tidak, kembali"
      >
        <img src={imgIllustration} alt="gambar" width="250px" style={{ marginBottom: "30px" }} />
        <h5>Apakah anda yakin Event Ini Akan menghapus event ini ?</h5>
      </AlertConfirmAction>

      <AlertSuccess
        isSuccess={isSuccess}
        buttonLabel="Kembali ke dashboard"
        prompt="Berhasil"
        description={
          event?.publicInformation.eventStatus
            ? "Event telah dipublikasi"
            : "Event telah menjadi draft"
        }
        onConfirm={() => setSucces(false)}
      />

      <Dropdown isOpen={isOpen} toggle={() => setOpen((open) => !open)}>
        <DropdownToggle tag="div">
          <IconMoreVertical />
        </DropdownToggle>

        <DropdownMenu right>
          <DropdownItem onClick={() => setConfirm(true)}>
            <ItemActionWrapper>
              <span>
                {event?.publicInformation.eventStatus ? "Jadikan draft" : "Publikasi Event"}
              </span>
              <span>
                {event?.publicInformation.eventStatus ? (
                  <IconEyeStrip size="16" />
                ) : (
                  <IconEdit size="16" />
                )}
              </span>
            </ItemActionWrapper>
          </DropdownItem>
          <DropdownItem
            disabled={event?.publicInformation.eventStatus ? true : false}
            onClick={() => setConfirmDelete(true)}
          >
            <ItemActionWrapper>
              <span>Hapus Event</span>
              <span>
                <IconTrash size="16" disabled />
              </span>
            </ItemActionWrapper>
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </React.Fragment>
  );
}

const ItemActionWrapper = styled.div`
  min-width: 10rem;
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;

  display: flex;
  justify-content: space-between;
  gap: 0.5rem;

  > *:nth-child(1) {
    flex-grow: 1;
  }
  > *:nth-child(2) {
    flex-shrink: 0;
    color: var(--ma-blue);
  }
`;

export { ButtonMoreMenu };
