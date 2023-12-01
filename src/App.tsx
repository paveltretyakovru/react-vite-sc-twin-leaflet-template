import "./App.css";
import styled from "styled-components";
import tw from "twin.macro";
import { Map } from "./Map";

const Wrapper = styled.div`
  ${tw`w-full h-full`};
`;

function App() {
  return (
    <Wrapper>
      <Map />
    </Wrapper>
  );
}

export default App;
