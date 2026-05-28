import { style } from "@vanilla-extract/css";

export const overlay = style({
  position: "fixed",
  inset: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(0, 0, 0, 0.5)",
});

export const modal = style({
  width: "20rem",
  padding: "1.5rem",
  borderRadius: "1rem",
  background: "white",
  boxShadow: "0 0.5rem 1rem rgba(0,0,0,0.1)",
});

export const modalTitle = style({
  margin: "0 0 0.7rem",
  fontSize: "1.5rem",
});

export const modalDescription = style({
  marginBottom: "1.5rem",
  color: "#666",
});

export const buttonWrapper = style({
  display: "flex",
  justifyContent: "flex-end",
});

export const button = style({
  padding: "0.625rem 1rem",
  border: "none",
  borderRadius: "0.625rem",
  background: "black",
  color: "white",
  cursor: "pointer",
});
