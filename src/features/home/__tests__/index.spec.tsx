import React from "react";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../index";
import "@testing-library/jest-dom";

describe("HomePage", () => {
  it("render title", () => {
    render(<HomePage />);
    expect(screen.getByText(/Bem-vindo/i)).toBeInTheDocument();
    expect(screen.getByText(/DevConnect/i)).toBeInTheDocument();
  });

  it("render button 'Comece agora'", () => {
    render(<HomePage />);
    expect(screen.getByRole("button", { name: /Comece agora/i })).toBeInTheDocument();
  });

  it("render feature cards", () => {
    render(<HomePage />);
    expect(screen.getByText(/Encontre Devs/i)).toBeInTheDocument();
    expect(screen.getByText("Publique Projetos",{exact:true})).toBeInTheDocument();
    expect(screen.getByText(/Conexões/i)).toBeInTheDocument();
    expect(screen.getByText(/Perfil Profissional/i)).toBeInTheDocument();
  });

  it("render step cards", () => {
    render(<HomePage />);
    expect(screen.getByText(/Como funciona/i)).toBeInTheDocument();
    expect(screen.getByText(/Crie seu perfil/i)).toBeInTheDocument();
    expect(screen.getByText(/Encontre ou publique projetos/i)).toBeInTheDocument();
    expect(screen.getByText(/Colabore e cresça/i)).toBeInTheDocument();
  });

  it("render images", () => {
    render(<HomePage />);
    const images = screen.getAllByRole("img");
    expect(images.length).toBeGreaterThan(0);
  });
});