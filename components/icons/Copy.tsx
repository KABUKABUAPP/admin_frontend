import React from "react";

interface Props {
  handleClick?: () => any;
}

const Copy: React.FC<Props> = ({ handleClick }) => {
  return (
    <svg onClick={handleClick} width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M19 7.625V16.375C19 18.125 18.125 19 16.375 19H7.625C5.875 19 5 18.125 5 16.375V7.625C5 5.875 5.875 5 7.625 5H16.375C18.125 5 19 5.875 19 7.625ZM13.75 1C13.75 0.586 13.414 0.25 13 0.25H3.625C1.448 0.25 0.25 1.448 0.25 3.625V13C0.25 13.414 0.586 13.75 1 13.75C1.414 13.75 1.75 13.414 1.75 13V3.625C1.75 2.293 2.293 1.75 3.625 1.75H13C13.414 1.75 13.75 1.414 13.75 1Z" fill="#161616"/>
    </svg>

  );
};

export default Copy;
