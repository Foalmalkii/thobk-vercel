import React from "react";

const StatisticCardWrapper = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <div className={`border rounded-[14px] p-6 ${className}`}>{children}</div>
  );
};

const Title = ({
  children,
  ...props
}: {
  children: React.ReactNode;
  props?: React.HTMLAttributes<HTMLDivElement>;
}) => {
  return (
    <h2 className="text-xl font-bold" {...props}>
      {children}
    </h2>
  );
};

const Container = ({ children }: { children: React.ReactNode }) => {
  return <div className="mt-4">{children}</div>;
};

StatisticCardWrapper.Title = Title;
StatisticCardWrapper.Container = Container;

export default StatisticCardWrapper;
