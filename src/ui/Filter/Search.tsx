import React, { useState, useCallback, CSSProperties } from 'react';
import Input from '../../components/Input';
import { locale } from '../../locale';
import { Locale } from '../../types';

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  style?: CSSProperties;
  lang: Locale;
};

function Search({ onSearch, lang, style }: SearchProps) {
  const [search, setSearch] = useState('');

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      const value = e.target.value;
      setSearch(value);
      onSearch(value);
    },
    [onSearch]
  );

  return (
    <>
      <Input
        label={locale[lang].search}
        value={search}
        style={style}
        dataTestid="search-input"
        onChange={handleChangeSearch}
      />
    </>
  );
}

export default Search;
