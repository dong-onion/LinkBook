import * as S from '../../Modal.style';
import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { Button, Input, ImageUpload } from '../../../index';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userInfo } from '../../../../recoil/user';
import { useUserInfo } from '../contexts/UserInfoProvider';
import { getUserInfo, updateUserInfo } from '../../../../apis/UserAPI';
import { showModalStatus } from '../../../../recoil/showModal';
import { User } from '../../../../types';

interface Props {
  handlePage: MouseEventHandler;
  token: string;
  userData: User;
}

interface ValidateError {
  name: string;
  introduce: string;
  image: string;
}

const Page01 = ({ handlePage, token, userData }: Props) => {
  const { validateUserInfo, setBasicUserInfo } = useUserInfo();
  const setUserInfoState = useSetRecoilState(userInfo);
  const closeModal = useResetRecoilState(showModalStatus);

  const nameRef = useRef<HTMLInputElement>(null);
  const introduceRef = useRef<HTMLInputElement>(null);

  const [imageSrc, setImageSrc] = useState('');
  const [errorText, setErrorText] = useState<ValidateError>({
    name: '',
    introduce: '',
    image: '',
  });

  const handleStoreUserInfo: MouseEventHandler<HTMLInputElement> = (e) => {
    const storeUserData = {
      name: nameRef.current.value,
      introduce: introduceRef.current.value,
      image: imageSrc,
    };

    if (!validateUserBasicInfo(storeUserData)) return;

    setBasicUserInfo(storeUserData);
    handlePage(e);
  };

  const handleUpdateUserInfo = async () => {
    const storeUserData = {
      name: nameRef.current.value,
      introduce: introduceRef.current.value,
      image: imageSrc,
    };

    if (!validateUserBasicInfo(storeUserData)) return;

    try {
      const updateUserData = {
        ...storeUserData,
        interests: userData.interests,
      };
      await updateUserInfo(updateUserData, token);

      const newUserInfo = await getUserInfo(token);
      setUserInfoState(newUserInfo);
      closeModal();
    } catch (error) {
      console.log(error);
      alert('문제가 발생했습니다.');
    }
  };

  const validateUserBasicInfo = ({ name, introduce, image }: ValidateError) => {
    const storeUserData = {
      name,
      introduce,
      image,
    };
    const error = validateUserInfo(storeUserData);
    const { nameValue, introduceValue, imageValue } = error;

    if (!nameValue.status || !introduceValue.status || !imageValue.status) {
      setErrorText({
        name: nameValue.error,
        introduce: introduceValue.error,
        image: imageValue.error,
      });

      return false;
    }

    return true;
  };

  useEffect(() => {
    if (!userData) return;

    nameRef.current.value = userData.name;
    introduceRef.current.value = userData.introduce;
    setImageSrc(userData.image);

    nameRef.current.focus();
  }, [userData]);

  return (
    <>
      {userData && (
        <S.InnerContainer>
          <S.Title>
            {userData.name}님의 <br />
            <S.MainText>수정할 정보</S.MainText>를 입력해주세요.
          </S.Title>
          <S.ImageUploadWrapper>
            <ImageUpload
              version="modal"
              imageSrc={imageSrc}
              setImageSrc={setImageSrc}
            />
            {errorText.image && <S.ErrorText>{errorText.image}</S.ErrorText>}
          </S.ImageUploadWrapper>
          <S.UserInputContainer>
            <Input
              placeholder="변경할 닉네임"
              type="text"
              ref={nameRef}
              errorText={errorText.name}
            />
            <Input
              placeholder="변경할 한 줄 소개"
              type="text"
              ref={introduceRef}
              errorText={errorText.introduce}
            />
          </S.UserInputContainer>
          <S.ButtonContainer>
            <Button type="button" onClick={handleUpdateUserInfo}>
              수정 완료
            </Button>
            <Button
              type="button"
              onClick={handleStoreUserInfo}
              version="mainLight"
            >
              관심 태그 수정
            </Button>
          </S.ButtonContainer>
        </S.InnerContainer>
      )}
    </>
  );
};

export default Page01;
