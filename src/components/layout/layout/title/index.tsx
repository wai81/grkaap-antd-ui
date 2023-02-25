import React from "react";
import { TitleProps } from "@pankod/refine-core";
import routerProvider from "@pankod/refine-react-router-v6";

const { Link } = routerProvider;

export const Title: React.FC<TitleProps> = ({ collapsed }) => (
  <Link to="/">
    {collapsed ? (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="/grcapp-collapsed_2.svg"
          alt="Refine"
          style={{
            margin: "0 auto",
            padding: "12px 0",
            maxHeight: "65.5px",
          }}
        />
      </div>
    ) : (
      <img
        src="/grcapp_3.svg"
        alt="Refine"
        style={{
          width: "200px",
          padding: "12px 24px",
        }}
      />
    )}
  </Link>
);
