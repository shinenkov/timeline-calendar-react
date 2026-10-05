import { useState, useCallback, useEffect, CSSProperties } from "react";
import Input from "shared/ui/Input";
import { locale } from "shared/lib";
import { useCalendarConfig } from "shared/context";

type SearchProps = {
  onSearch: (searchTerm: string) => void;
  style?: CSSProperties;
};

export function Search({ onSearch, style }: SearchProps) {
  const { lang } = useCalendarConfig();
  const [search, setSearch] = useState("");
  const [debouncedValue, setDebouncedValue] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(search);
    }, 300);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  const handleChangeSearch = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      setSearch(e.target.value);
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
