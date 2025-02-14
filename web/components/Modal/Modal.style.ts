import styled from '@emotion/styled';

// Modal Component
export const Container = styled.div`
  position: fixed;
  top: calc(50% - 295px);
  left: calc(50% - 255px);
  z-index: 30;
  width: 520px;
  height: 590px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.white[0]};
  border-radius: 20px;
  animation: modalShow 0.3s;

  @keyframes modalShow {
    from {
      margin-top: -50px;
      opacity: 0;
    }
    to {
      margin-top: 0;
      opacity: 1;
    }
  }
`;

export const Dim = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  animation: modalBgShow 0.3s;

  @keyframes modalBgShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 15px;
`;

export const Logo = styled.h1`
  color: ${({ theme }) => theme.colors.main};
  font-weight: bold;
  font-size: 35px;
  font-family: 'Dongle', sans-serif;
`;

export const CloseBtn = styled.button`
  width: fit-content;
  height: fit-content;
  background-color: transparent;
  border: none;
  border-radius: 50px;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.colors.gray[5]};
  }
`;

// Modal Inner(version) Style
export const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 420px;
  height: 420px;
  margin: 30px auto;
`;

export const InnerContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 420px;
  height: 420px;
  margin: 30px auto;
`;

export const Title = styled.div`
  width: fit-content;
  margin: 0 auto;
  padding-top: 20px;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.h[0]};
  font-family: 'Noto Sans KR', sans-serif;
  line-height: 1.3;
  text-align: center;

  animation: fadeIn 0.5s;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Description = styled.p`
  width: fit-content;
  margin: 20px auto 0 auto;
  font-size: ${({ theme }) => theme.fontSize.b[1]};
`;

export const MainText = styled.span`
  color: ${({ theme }) => theme.colors.main[0]};
`;

export const IconContainer = styled.div`
  width: fit-content;
  height: fit-content;
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
`;

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const UserInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

export const ImageUploadWrapper = styled.div`
  width: fit-content;
  margin: 10px auto 0 auto;
`;

export const KeepLoginWrapper = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  width: fit-content;
  padding-left: 10px;
`;

export const KeepLoginInput = styled.input`
  margin: 0;
`;

export const KeepLoginText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.b[2]};
  font-family: 'Noto Sans KR', sans-serif;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-top: 10px;
`;

export const PreviousButton = styled.div`
  position: absolute;
  top: 55px;
  left: 20px;
  cursor: pointer;
`;

export const SignUpContainer = styled.div`
  width: fit-content;
  margin: 0 auto;
`;

export const SignUpText = styled.p`
  margin-bottom: 8px;
  font-size: ${({ theme }) => theme.fontSize.b[2]};
  font-family: 'Noto Sans KR', sans-serif;
`;

export const ConfirmButton = styled.button`
  box-sizing: border-box;
  margin-bottom: 150px;
  padding: 10px 30px;
  color: ${({ theme }) => theme.colors.white[0]};
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSize.b[0]};
  background-color: ${({ theme }) => theme.colors.main[0]};
  border: none;
  border-radius: 30px;
  cursor: pointer;

  &:hover {
    transition: 0.25s;
    box-shadow: 0 0.5em 0.5em -0.4em ${({ theme }) => theme.colors.gray[3]};
    transform: translateY(-0.25em);
  }
  &:active {
    transition: all 0.2s;
    transform: scale(0.95);
  }
`;

export const LogoText = styled.span`
  font-size: ${({ theme }) => theme.fontSize.l[2]};
  font-family: 'Dongle', sans-serif;
`;

export const ErrorText = styled.p`
  font-size: ${({ theme }) => theme.fontSize.c[0]};
  color: red;
  margin: 5px;
`;

export const TagSelectorWrapper = styled.div`
  height: 200px;
`;

export const Spinner = styled.div`
  width: 14px;
  height: 14px;
  animation: spin 1000ms infinite linear;
  @keyframes spin {
    100% {
      transform: rotate(360deg);
    }
  }
`;
