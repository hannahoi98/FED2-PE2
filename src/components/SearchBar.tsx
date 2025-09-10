import { TextField, InputAdornment } from "@mui/material";
import { Search } from "@mui/icons-material";
import { useEffect, useMemo, useState, useRef } from "react";
import { COLORS } from "../theme";

type Props = {
  value: string;
  onChange: (next: string) => void;
  onActiveQueryChange: (activeQuery: string) => void;
  placeholder?: string;
  width?: number | string;
  delay?: number;
  minLength?: number;
};

export default function SearchBar({
  value,
  onChange,
  onActiveQueryChange,
  placeholder = "Search Venues...",
  width = 280,
  delay = 350,
  minLength = 3,
}: Props) {
  const [debounced, setDebounced] = useState(value);
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    if (timeout.current) window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setDebounced(value), delay);
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, [value, delay]);

  const activeQuery = useMemo(() => {
    const trimmed = debounced.trim();
    return trimmed.length >= minLength ? trimmed : "";
  }, [debounced, minLength]);

  useEffect(() => {
    onActiveQueryChange(activeQuery);
  }, [activeQuery, onActiveQueryChange]);

  const tooShort = value.trim().length > 0 && value.trim().length < minLength;

  return (
    <TextField
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      type="search"
      size="small"
      sx={{
        width: { xs: "100%", sm: 200, md: width },
        "& .MuiOutlinedInput-root": {
          "& fieldset": { borderColor: COLORS.pine },
          "&:hover fieldset": { borderColor: COLORS.mint },
          "&.Mui-focused fieldset": { borderColor: COLORS.pine },
        },
        "& .MuiInputBase-input": {
          color: COLORS.pine,
          caretColor: COLORS.pine,
        },
        "& .MuiFormHelperText-root": {
          color: tooShort ? COLORS.pine : "inherit",
        },
      }}
      helperText={tooShort ? `Type at least ${minLength} letters` : " "}
      slotProps={{
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <Search />
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
