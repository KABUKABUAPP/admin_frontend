import React, { FC } from "react";

interface Props {
  asideComponents?: React.ReactNode;
  mainComponents?: React.ReactNode;
}

const ViewTripLayout: FC<Props> = ({ asideComponents, mainComponents }) => {
  return (
    <div className="flex gap-8 w-full max-lg:flex-col max-lg:gap-4 max-lg:justify-center">
      <aside className="w-[300px] max-lg:w-full lg:h-[calc(100vh-100px)] lg:overflow-y-scroll pt-10 pb-10 scrollbar-none">{asideComponents}</aside>
      <main className="w-[calc(100%-300px)] max-lg:w-full lg:h-[calc(100vh-100px)] lg:overflow-y-scroll max-lg:h-screen p-4 pt-10 scrollbar-none">
        {mainComponents}
      </main>
    </div>
  );
};

export default ViewTripLayout;
