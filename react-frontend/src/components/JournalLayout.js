import styled from 'styled-components';

const JournalWrapper = styled.div`
  background: #fef7e7;
  font-family: 'Georgia', serif;
  font-size: 18px;
  padding: 20px;
  margin: auto;
  max-width: 800px;
  color: #2f2c29;
  border: 5px solid #543b32;
  box-shadow: 10px 10px 0 #2f2c29;
`;

export default function JournalLayout({ children }) {
  return <JournalWrapper>{children}</JournalWrapper>;
}
