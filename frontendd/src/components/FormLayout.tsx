import { ReactNode } from "react";

const FormLayout = ({ children }: { children: ReactNode }) => {
  return (
    <section className="card p-4 rounded w-full max-w-md">{children}</section>
  );
};

export default FormLayout;
