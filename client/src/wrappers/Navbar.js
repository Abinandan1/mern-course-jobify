import styled from "styled-components";

const Wrapper = styled.nav`
  height: var(--nav-height);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 1px 0 0 rgba(0, 0, 0, 0.1);
  background: var(--background-secondary-color);
  .nav-center {
    display: flex;
    width: 90vw;
    justify-content: space-between;
    align-items: center;
  }
  .toggle-btn {
    background: transparent;
    border-color: transparent;
    color: var(--primary-500);
    font-size: 1.75rem;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  .logo-text {
    display: none;
  }
  .btn-container {
    display: flex;
    align-items: center;
  }
  .logo {
    display: flex;
    align-items: center;
  }
  @media screen and (min-width: 992px) {
    position: sticky;
    top: 0;
    .nav-center {
      width: 90%;
    }
    .logo {
      display: none;
    }
    .logo-text {
      display: block;
    }
  }
`;
export default Wrapper;
