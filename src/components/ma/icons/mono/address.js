import * as React from "react";

function IconAddress({ size = 24 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4.5 3V6.75H3.75V8.25H6V4.5H18V19.5H6V17.25H4.5V21H19.5V3H4.5ZM12 7.5C10.35 7.5 9 8.85 9 10.5C9 11.3348 9.35775 12.0877 9.91425 12.633C9.40397 12.9777 8.98563 13.4419 8.69558 13.9851C8.40554 14.5283 8.25258 15.1342 8.25 15.75H9.75C9.75 15.1533 9.98705 14.581 10.409 14.159C10.831 13.7371 11.4033 13.5 12 13.5C12.5967 13.5 13.169 13.7371 13.591 14.159C14.0129 14.581 14.25 15.1533 14.25 15.75H15.75C15.7474 15.1342 15.5945 14.5283 15.3044 13.9851C15.0144 13.4419 14.596 12.9777 14.0858 12.633C14.6423 12.0877 15 11.3355 15 10.5C15 8.85 13.65 7.5 12 7.5ZM4.5 9V10.5H3.75V12H6V9H4.5ZM12 9C12.8378 9 13.5 9.66225 13.5 10.5C13.5 11.3378 12.8378 12 12 12C11.1623 12 10.5 11.3378 10.5 10.5C10.5 9.66225 11.1623 9 12 9ZM4.5 12.75V14.25H3.75V15.75H6V12.75H4.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

export default IconAddress;