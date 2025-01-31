import React, { useEffect, useRef, useState } from 'react';
import { getTag } from '../../apis/TagAPI';
import { TagType } from '../../types';
import { TagItemType } from '../../types/tag';
import { Input, InputResult, Tag } from '../index';
import * as S from './TagSelector.style';

interface Props {
  selectedTag: string[];
  setSelectedTag: (selectedTag: string[]) => void;
}

const TagSelector = ({ selectedTag, setSelectedTag, ...styles }: Props) => {
  const [tags, setTags] = useState([]);
  const selectorRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const [activeItem, setActiveItem] = useState(0);
  const [inputResultVisible, setInputResultVisible] = useState(false);
  const [autoCompleteSearch, setAutoCompleteSearch] = useState<string[]>(tags);

  useEffect(() => {
    (async () => {
      try {
        const res: TagType = await getTag();
        const subTags: string[] = [];

        res.tags.forEach((tag: TagItemType) => {
          tag.subTags.forEach((subTag: string) => {
            subTags.push(subTag);
          });
        });

        setTags(subTags);
        setAutoCompleteSearch(subTags);
      } catch (error) {
        console.log(error);
        alert('문제가 발생했습니다.');
      }
    })();
  }, []);

  const handleFilterInputValue = () => {
    const keyword = inputRef.current.value;
    const filteredSearch = tags.filter((tag) => tag.indexOf(keyword) >= 0);

    if (!keyword) {
      setAutoCompleteSearch(tags);
      return;
    }

    setAutoCompleteSearch(filteredSearch);
  };

  const handleClickResultItem = (e: React.MouseEvent<HTMLLIElement>) => {
    const target = e.currentTarget;
    const value = target.innerText;
    handleAddTag(value);
    handleResetSelector();
  };

  const handleResetSelector = () => {
    inputRef.current.value = '';
    listRef.current.scrollTo(0, 0);
    setActiveItem(0);
  };

  const handleAddTag = (value: string) => {
    const updatedData = new Set([...selectedTag, value]);
    setSelectedTag(Array.from(updatedData));
  };

  const handleRemoveTag = (value: string) => {
    const updatedData = selectedTag.filter((tag) => tag !== value);
    setSelectedTag(updatedData);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.keyCode === 229) {
      return;
    }

    const node = listRef.current;
    const itemHeight =
      listRef.current && listRef.current.children[0].scrollHeight;
    switch (e.key) {
      case 'ArrowUp':
        if (activeItem > 0) {
          setActiveItem(activeItem - 1);
          node?.scrollTo(0, itemHeight * (activeItem - 1));
        }
        break;
      case 'ArrowDown':
        if (activeItem < autoCompleteSearch.length - 1) {
          setActiveItem(activeItem + 1);
          node?.scrollTo(0, itemHeight * activeItem);
        }
        break;
      case 'Enter':
        handleAddTag(autoCompleteSearch[activeItem]);
        handleResetSelector();
        break;
      case 'Escape':
        setActiveItem(0);
        handleResetSelector();
        break;
      default:
        setActiveItem(0);
    }
  };

  const handleFoucsInput = () => {
    setInputResultVisible(true);
  };

  const handleCloseInputResult = (e: any) => {
    const element = selectorRef.current;
    if (!element) return;

    if (!element.contains(e.target)) {
      setInputResultVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleCloseInputResult);
    return () => {
      window.removeEventListener('click', handleCloseInputResult);
    };
  }, []);

  return (
    <>
      <S.Container ref={selectorRef} {...styles}>
        <Tag tagItems={selectedTag} handleRemoveTag={handleRemoveTag} />
        <Input
          type="text"
          ref={inputRef}
          placeholder="클릭 혹은 엔터를 사용해서 태그를 입력해 주세요."
          onChange={handleFilterInputValue}
          onKeyDown={handleKeyDown}
          handleFoucsInput={handleFoucsInput}
        />
        <InputResult
          active={activeItem}
          ref={listRef}
          inputResultVisible={inputResultVisible}
          inputResults={autoCompleteSearch}
          onClick={handleClickResultItem}
        />
      </S.Container>
    </>
  );
};

export default TagSelector;
