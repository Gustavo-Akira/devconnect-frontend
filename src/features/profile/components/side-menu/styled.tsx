import styled from '@emotion/styled';

export const SideMenuContainer = styled.div`
  width: 250px;
  height: 100%;
  background-color: #f9f9f9;
`;

export const SideMenuProfileContainer = styled.div`
  width: 100%;
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 1.2em;
  border-bottom: 1px solid black;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 30vh;
`;

export const SideMenuNavBar = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const SideMenuLink = styled.li`
  width: 75%;
  padding: 15px;
  border-radius: 10px;
  font-family: ${({ theme }) => theme.typography.fontFamily};
  text-align: center;
  display: flex;
  align-items: center;
  margin-top: 20px;
  & > svg {
    margin-right: 10px;
  }

  &:hover {
    background-color: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
    cursor: pointer;
  }
`;
