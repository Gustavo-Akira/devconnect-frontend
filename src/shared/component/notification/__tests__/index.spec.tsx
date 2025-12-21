import { render, screen } from '@testing-library/react';
import { Notification } from '../index';

describe('Notification component', () => {
  it('should render the message when open is true', () => {
    render(
      <Notification
        message="Operação realizada com sucesso"
        type="success"
        open={true}
        onClose={() => {}}
      />,
    );

    expect(
      screen.getByText('Operação realizada com sucesso'),
    ).toBeInTheDocument();
  });

  it('should render an alert with success severity', () => {
    render(
      <Notification
        message="Sucesso"
        type="success"
        open={true}
        onClose={() => {}}
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardSuccess');
  });

  it('should render an alert with error severity', () => {
    render(
      <Notification
        message="Erro inesperado"
        type="error"
        open={true}
        onClose={() => {}}
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardError');
  });

  it('should render an alert with warning severity', () => {
    render(
      <Notification
        message="Atenção"
        type="warning"
        open={true}
        onClose={() => {}}
      />,
    );

    const alert = screen.getByRole('alert');
    expect(alert).toHaveClass('MuiAlert-standardWarning');
  });

  it('should not render the notification when open is false', () => {
    render(
      <Notification
        message="Mensagem escondida"
        type="success"
        open={false}
        onClose={() => {}}
      />,
    );

    expect(screen.queryByText('Mensagem escondida')).not.toBeInTheDocument();
  });
});
