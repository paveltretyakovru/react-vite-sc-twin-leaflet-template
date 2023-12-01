import "./App.css";
import styled from "styled-components";
import tw from "twin.macro";

const Wrapper = styled.div`
  ${tw`w-full h-full`};

  border: 1px solid red;
`;

function App() {
  return (
    <>
      <Wrapper>hello world</Wrapper>
    </>
  );
}

export default App;
