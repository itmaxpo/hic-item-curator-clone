import styled from 'styled-components'
import { Button, TextField, FlexContainer, Card, Base, COLORS } from '@tourlane/tourlane-ui'

export const ImageSearchWrapper = styled(FlexContainer)`
  text-align: center;
  width: 100%;
`

export const Wrapper = styled.div`
  width: 95%;
  margin-top: 60px;

  #gradient,
  #gradient-top {
    position: sticky;
    z-index: 2;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100px; /* adjust it to your needs */
    background: url(data:image/svg+xml;base64,alotofcodehere);
    background: -moz-linear-gradient(top, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%);
    background: -webkit-gradient(
      linear,
      left top,
      left bottom,
      color-stop(30%, rgba(255, 255, 255, 0)),
      color-stop(70%, rgba(255, 255, 255, 1))
    );
    background: -webkit-linear-gradient(
      top,
      rgba(255, 255, 255, 0) 30%,
      rgba(255, 255, 255, 1) 70%
    );
    background: -o-linear-gradient(top, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%);
    background: -ms-linear-gradient(top, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%);
    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 30%, rgba(255, 255, 255, 1) 70%);
  }

  #gradient-top {
    top: 0;
    transform: rotate(180deg);
    visibility: hidden;
  }
`

export const ResultsWrapper = styled.div`
  margin-top: -70px;
  width: 100%;
  height: 800px;
  overflow-y: scroll;
  position: relative;

  ::-webkit-scrollbar {
    -webkit-appearance: none;
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    width: 16px;
    height: 253px;
    border-radius: 4px;
    background-color: ${COLORS.LINE_GRAY};
    -webkit-box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
`

export const ImageCard = styled(Card)`
  display: inline-block;
  position: relative;
  width: 30%;
  margin-bottom: 42px;
  height: 280px;

  &:nth-child(2n) {
    margin: 0 20px;
    margin-bottom: 42px;
  }

  &:hover {
    cursor: pointer;
  }
`

export const ImageWrapper = styled.div`
  height: 220px;
  width: 100%;
`

export const StyledImg = styled.img`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
  max-width: 100%;
  max-height: 220px;
`

export const StyledTextField = styled(TextField)`
  margin-bottom: 20px;
  width: 350px;
`

export const StyledButton = styled(Button)`
  width: 350px;
`

export const StyledP = styled(Base)`
  margin-top: 15px;
  color: ${COLORS.INACTIVE_GRAY};
  text-align: left;
  padding: 0 16px;
`
