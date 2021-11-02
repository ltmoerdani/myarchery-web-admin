import * as React from "react";
import PreviewFieldText from "./PreviewFieldText";

export default function PreviewCanvas({ data }) {
  const { backgroundImage, backgroundUrl, backgroundPreviewUrl, fields } = data;
  const containerDiv = React.useRef(null);

  const getBackgroundImage = () => backgroundUrl || backgroundPreviewUrl || backgroundImage;

  return (
    <div
      ref={containerDiv}
      style={{
        position: "relative",
        height: 0,
        paddingBottom: `${100 * (908 / 1280)}%`,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "relative",
          width: 1280,
          height: 908,
          backgroundColor: "white",
          backgroundImage: `url(${getBackgroundImage()})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
          transform: `scale(${containerDiv.current?.offsetWidth / 1280})`,
          transformOrigin: "top left",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />

        {fields?.length ? (
          fields.map((field) => (
            <PreviewFieldText key={field.name} name={field.name} data={field} />
          ))
        ) : (
          <div>Ada error pada data editor</div>
        )}
      </div>
    </div>
  );
}