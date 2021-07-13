import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { storageService } from 'fbase';
import { v4 as uuidv4 } from 'uuid';
import defaultProfileImg from '../../img/17004.png';
import palette from 'styles/palette';

const EditProfile = ({ userObj }) => {
  const history = useHistory();
  const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
  const [attachment, setAttachment] = useState();

  const onChange = (event) => {
    const {
      target: { value },
    } = event;
    setNewDisplayName(value);
  };

  const onAttachmentChange = async (event) => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };

  const onAttachmentChangeBtn = (event) => {
    event.preventDefault();
    document.getElementById('selectImage').click();
  };

  const onClearAttachment = () => {
    setAttachment(null);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (attachment) {
      const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
      const response = await fileRef.putString(attachment, 'data_url');
      const attachmentUrl = await response.ref.getDownloadURL();
      if (userObj.photoURL !== attachmentUrl) {
        await userObj.updateProfile({
          photoURL: attachmentUrl,
        });
      }
    } else if (attachment === null) {
      await userObj.updateProfile({
        photoURL: defaultProfileImg,
      });
    }
    if (userObj.displayName !== newDisplayName) {
      await userObj.updateProfile({
        displayName: newDisplayName,
      });
    }
    history.push('/profile');
  };

  return (
    <StyledMain className="inner">
      <article>
        <form onSubmit={onSubmit}>
          <div className="attachment-change-btn">
            {!attachment && (
              <>
                <img
                  className="default-profile-img"
                  src={defaultProfileImg}
                  alt="기본 프로필"
                />
                <button onClick={onAttachmentChangeBtn}>+</button>
              </>
            )}
            <input
              id="selectImage"
              hidden
              type="file"
              accept="image/*"
              placeholder="닉네임을 입력해주세요"
              onChange={onAttachmentChange}
            />
            {attachment && (
              <>
                <button onClick={onClearAttachment}>-</button>
                <div className="attachment-area">
                  <img src={attachment} alt="프로필 사진" />
                </div>
              </>
            )}
          </div>
          <input
            onChange={onChange}
            type="text"
            placeholder="닉네임을 입력해주세요"
            value={newDisplayName}
          />
          <input type="submit" value="프로필 업데이트" />
        </form>
      </article>
    </StyledMain>
  );
};
const StyledMain = styled.main`
  height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;

  article {
    form {
      padding: 0px 20px 80px;
      box-sizing: border-box;
      width: 350px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .attachment-change-btn {
        width: 150px;
        height: 150px;
        border-radius: 50%;
        background-color: #ced4da;
        position: relative;
        margin-bottom: 30px;

        .default-profile-img {
          position: absolute;
          width: 150px;
          top: 42%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        button {
          position: absolute;
          right: 0;
          bottom: 0;
          border: 2px solid #868e96;
          outline: none;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: ${palette.grey_1};
          padding: 0;
          cursor: pointer;
        }

        .attachment-area {
          width: 150px;
          height: 150px;
          border-radius: 50%;
          overflow: hidden;
          img {
            width: 150px;
            height: 150px;
            object-fit: cover;
          }
        }
      }
      input[type='text'] {
        width: 100%;
        margin: 0;
        padding: 0;
        border: 0;
        box-sizing: border-box;
        padding: 5px 15px 7px;
        font-size: 15px;
        border-bottom: 1px solid #ced4da;
        margin-bottom: 60px;
        color: #495057;
        &::placeholder {
          color: #ced4da;
        }
      }
      input[type='submit'] {
        padding: 0 15px;
        height: 40px;
        background: #ced4da;
        color: ${palette.grey_1};
        opacity: 0.7;
        font-weight: bold;
        outline: none;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        transition: 0.3s all;
        margin-top: 10px;
        margin-bottom: 10px;

        &:hover {
          opacity: 1;
          background: #20c997;
        }
      }
    }
  }
`;

export default EditProfile;
