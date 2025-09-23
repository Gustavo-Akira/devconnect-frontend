import { render, screen, fireEvent } from "@testing-library/react";
import { ProjectsPage } from "../index";
import { vi } from "vitest";

describe("ProjectsPage", () => {
  it("should render the title and add button", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Projects")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /add new project/i })).toBeInTheDocument();
  });

  it("should render the project rows", async () => {
    render(<ProjectsPage />);

    expect(await screen.findByText("Project One")).toBeInTheDocument();
    expect(await screen.findByText("Project Two")).toBeInTheDocument();

    expect((await screen.findAllByText(/Lorem ipsum/)).length).toBe(2);
  });

  it("should render action buttons for each row", async () => {
    render(<ProjectsPage />);

    const editButtons = await screen.findAllByLabelText("Edit Project");
    expect(editButtons).toHaveLength(2);

    const deleteButtons = await screen.findAllByLabelText("Delete Project");
    expect(deleteButtons).toHaveLength(2);

    const githubButtons = await screen.findAllByLabelText("Open Repository");
    expect(githubButtons).toHaveLength(2);
  });

  it("should trigger edit and delete handlers when clicked", async () => {
    const spy = vi.spyOn(console, "log").mockImplementation(() => {});

    render(<ProjectsPage />);

    const editButtons = await screen.findAllByLabelText("Edit Project");
    fireEvent.click(editButtons[0]);
    expect(spy).toHaveBeenCalledWith("Edit", "1");

    const deleteButtons = await screen.findAllByLabelText("Delete Project");
    fireEvent.click(deleteButtons[0]);
    expect(spy).toHaveBeenCalledWith("Delete", "1");

    spy.mockRestore();
  });

  it("should have pagination setup", () => {
    render(<ProjectsPage />);

    expect(screen.getByRole("button", { name: /go to next page/i })).toBeInTheDocument();
  });
});