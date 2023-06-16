import React, { FC } from "react";

interface Props {
  aside?: React.ReactNode;
  main?: React.ReactNode;
}

const SettingsLayout: FC<Props> = ({ aside, main }) => {
  return (
    <section className="h-screen px-6 max-md:h-fit">
      <div className="h-[80px] pt-4">
        <h1 className="mb-6 text-2xl">Settings</h1>
      </div>
      <div className="flex gap-12 max-md:flex-col h-[calc(100vh-80px)] py-4 max-md:h-fit">
        <div style={{ flex: 3 }}>{aside}</div>
        <div style={{ flex: 6 }}>{main}</div>
      </div>
    </section>
  );
};

export default SettingsLayout;
