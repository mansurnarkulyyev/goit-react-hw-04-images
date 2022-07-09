import PropTypes from 'prop-types';
import { StyledButton } from './Button.styled';

export const Button = ({ children, onClick }) => (
  <StyledButton type="button" onClick={onClick}>
    {children}
  </StyledButton>
);

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};
