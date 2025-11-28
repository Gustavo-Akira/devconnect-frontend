import { render, screen } from "@testing-library/react";
import { ProfileCard } from "../profileCard";
import "@testing-library/jest-dom";

// Necessário para evitar warnings do MUI sobre ResizeObserver
beforeAll(() => {
  window.ResizeObserver = window.ResizeObserver || class {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
});

describe("ProfileCard Component", () => {
  const mockProps = {
    name: "Gustavo",
    city: "São Paulo",
    score: 0.82,
    stacks: ["React", "Node.js", "Go"],
  };

  it("renderiza o nome", () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText("Gustavo")).toBeInTheDocument();
  });

  it("renderiza a cidade", () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText("São Paulo")).toBeInTheDocument();
  });

  it("mostra o score em porcentagem corretamente", () => {
    render(<ProfileCard {...mockProps} />);
    expect(screen.getByText("Match: 82%")).toBeInTheDocument();
  });

  it("renderiza os stacks", () => {
    render(<ProfileCard {...mockProps} />);

    mockProps.stacks.forEach((stack) => {
      expect(screen.getByText(stack)).toBeInTheDocument();
    });
  });

  it("tem a barra de progresso com o valor correto", () => {
    const { container } = render(<ProfileCard {...mockProps} />);

    const progress = container.querySelector('.MuiLinearProgress-bar');

    expect(progress).toHaveStyle(`transform: translateX(-18%)`);
  });

  it("renderiza corretamente mesmo sem stacks", () => {
    render(
      <ProfileCard
        name="João"
        city="Curitiba"
        score={0.5}
        stacks={[]}
      />
    );

    expect(screen.getByText("João")).toBeInTheDocument();
    expect(screen.queryByRole("chip")).not.toBeInTheDocument(); // nenhum chip
  });
});
