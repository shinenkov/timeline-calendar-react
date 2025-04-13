import React, { useState, useCallback, useEffect, CSSProperties } from "react";
import Input from "../../components/Input";
import { locale } from "../../locale";
import { Locale } from "../../types";

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  style?: CSSProperties;
  lang: Locale;
};

function Search({ onSearch, lang, style }: SearchProps) {
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(e.target.value); // Update the local input state immediately
    },
    [],
  );

  return (
    <Input
      label={locale[lang].search}
      value={search}
      style={style}
      dataTestid="search-input"
      onChange={handleChangeSearch}
    />
  );
}

export default Search;
