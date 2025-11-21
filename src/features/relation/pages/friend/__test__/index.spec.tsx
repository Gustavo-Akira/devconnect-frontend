import { vi, type Mock } from "vitest";
import { useAuth } from "../../../../../shared/context/auth/authContext";
import { render, screen } from "@testing-library/react";
import { FriendsPage } from "..";

vi.mock(
  '../../../../../shared/context/auth/authContext',
  async (importOriginal) => ({
    ...(await importOriginal()),
    useAuth: vi.fn(),
  }),
);


vi.mock('react-router-dom', async (importOriginal) => ({
  ...(await importOriginal()),
  useNavigate: () => vi.fn(),
}));


describe('Friends Page Ui tests', () => {
  beforeAll(() => {
    (useAuth as Mock).mockReturnValue({
        user: {
            id: 'user-id',
            name: 'Test User',
            email: 'akirauekita2002@gmail.com',
        },
    });
  });
  it('should render Friends Page correctly when user is authenticated', () => {
    render(<FriendsPage />);
    expect(screen.getByText('Meus Amigos')).toBeInTheDocument();
  });
});