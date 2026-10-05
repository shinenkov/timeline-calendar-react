import React, { useState, useCallback, useEffect, CSSProperties } from "react";
import { locale } from "shared/lib";
import Input from "shared/ui/Input";
import { Locale } from "shared/model";

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  style?: CSSProperties;
  lang: Locale;
};

export function Search({ onSearch, lang, style }: SearchProps) {
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
